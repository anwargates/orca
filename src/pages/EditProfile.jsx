import {
  Loader,
  LoadingOverlay,
  Notification,
  Radio,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useForm } from 'react-hook-form'
import { BsCheckCircleFill, BsX } from 'react-icons/bs'
// @ts-ignore
import LogoOrca from '../assets/logo-orca.svg'
import { FormReauthModal } from '../components/modals/FormReauthModal'
import { auth, db } from '../config/firebase'

export const EditProfile = () => {
  const [isModalOpened, toggleModal] = useDisclosure(false)
  const [isNotify, toggleNotify] = useDisclosure(false)
  const [isNotifyWrongPassword, toggleNotifyWrongPassword] =
    useDisclosure(false)
  const [loading, toggleLoading] = useDisclosure(false)
  const isNotEmailEditable =
    // @ts-ignore
    auth.currentUser.providerData[0].providerId !== 'password'

  // GET FIRESTORE USER PROFILE ON PAGE LOAD
  const getUserProfile = async () => {
    // @ts-ignore
    const userRef = doc(db, 'users', auth.currentUser.uid)
    const result = await getDoc(userRef).then((docSnap) => {
      if (docSnap.exists())
        return {
          // @ts-ignore
          displayName: auth.currentUser.displayName,
          // @ts-ignore
          email: auth.currentUser.email,
          nomorWA: docSnap.data().phoneNumber,
          jkel: docSnap.data().gender,
        }
    })
    // console.log('result', result)
    return result
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty, dirtyFields, isLoading },
  } = useForm({
    defaultValues: getUserProfile,
  })

  // SUBMIT HANDLER
  const onSubmit = async (data) => {
    // setTempData(data)
    console.log('form data', data)
    toggleLoading.open()

    if (isNotEmailEditable) {
      doUpdateProfile(data)
    } else {
      toggleModal.open()
    }
  }

  // REAUTHENTICATE BEFORE UPDATE DATA
  const reauthHandler = async (password) => {
    const cred = EmailAuthProvider.credential(
      // @ts-ignore
      auth.currentUser.email,
      password.password
    )
    // @ts-ignore
    await reauthenticateWithCredential(auth.currentUser, cred)
      .then(() => {
        doUpdateProfile(getValues())
        toggleModal.close()
      })
      .catch((e) => {
        toggleNotifyWrongPassword.open()
        return
      })
  }

  // UPDATE PROFILE DATA
  const doUpdateProfile = async (data) => {
    // console.log('reauth form data', data)
    // const cred = EmailAuthProvider.credential(data.email, data.password)
    // await reauthenticateWithCredential(auth.currentUser, cred)

    // @ts-ignore
    await updateEmail(auth.currentUser, data.email)
    // @ts-ignore
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
    })

    // @ts-ignore
    const userRef = doc(db, 'users', auth.currentUser.uid)
    await updateDoc(userRef, {
      phoneNumber: data.nomorWA,
      gender: data.jkel,
      isProfileCompleted: true,
    })
    toggleLoading.close()
    toggleNotify.open()
  }

  return (
    <>
      {/* NOTIFICATION SUKSES*/}
      <Notification
        icon={<BsCheckCircleFill size='1.1rem' />}
        color='teal'
        title='UPDATE PROFIL BERHASIL'
        className={`absolute z-50 left-0 right-0 w-fit m-auto transition-all ease-in-out ${
          isNotify ? 'top-2' : '-top-28'
        }`}
        onClose={() => {
          toggleNotify.close()
          window.location.reload()
        }}>
        Profil sudah diperbarui, silakan muat ulang halaman
      </Notification>

      {/* NOTIFICATION PASSWORD SALAH */}
      <Notification
        icon={<BsX size='1.1rem' />}
        color='red'
        title='PASSWORD SALAH'
        className={`absolute z-50 left-0 right-0 w-fit m-auto transition-all ease-in-out ${
          isNotifyWrongPassword ? 'top-2' : '-top-28'
        }`}
        onClose={() => {
          toggleNotifyWrongPassword.close()
        }}>
        Password yang anda masukkan salah, coba lagi
      </Notification>

      {/* REAUTHENTICATION FORM */}
      <FormReauthModal
        opened={isModalOpened}
        modalHandler={toggleModal}
        reauthHandler={reauthHandler}
        loadingHandler={toggleLoading}
      />

      {/* LOADING OVERLAY */}
      <LoadingOverlay
        loader={
          <Loader
            variant='dots'
            size={80}
          />
        }
        visible={loading}
        overlayBlur={2}
      />

      <div className='flex items-start justify-center'>
        <div className='container grid grid-cols-1 lg:grid-cols-3 items-start justify-center w-full lg:max-w-5xl'>
          {/* ORCA LOGO */}
          <div className='flex p-8'>
            <img
              src={LogoOrca}
              alt='logo-orca'
              className='w-24 lg:w-80'
            />
          </div>
          {/* FORM */}
          <div className='col-span-2 relative flex items-center justify-center p-2'>
            <LoadingOverlay
              loader={
                <Loader
                  variant='dots'
                  size={80}
                />
              }
              visible={isLoading}
              overlayBlur={2}
            />
            <form
              className='flex flex-col gap-6 w-full'
              onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col items-start gap-3'>
                <label
                  className='font-extrabold'
                  htmlFor='nama'>
                  Nama Lengkap
                </label>
                <input
                  className='w-full h-10 border rounded-lg border-black p-2'
                  type='text'
                  {...register('displayName')}
                />
              </div>
              <Tooltip
                label={
                  isNotEmailEditable
                    ? 'Anda tidak diperbolehkan mengganti email jika login menggunakan google atau facebook'
                    : null
                }>
                <div className='flex flex-col items-start gap-3'>
                  <label
                    className='font-extrabold'
                    htmlFor='email'>
                    Alamat Email
                  </label>
                  <input
                    className={`w-full h-10 border rounded-lg border-black p-2 disabled:bg-gray-400 disabled:border-gray-400`}
                    type='email'
                    // disabled={providerCheck ? true : false}
                    {...register('email', {
                      disabled: isNotEmailEditable ? true : false,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>
              </Tooltip>
              <div className='flex flex-col items-start gap-3'>
                <label
                  className='font-extrabold'
                  htmlFor='nomorWA'>
                  Nomor Whatsapp
                </label>
                <div className='relative w-full h-10 border rounded-lg border-black'>
                  <div className='absolute top-1/2 left-1 -translate-y-1/2'>
                    +62
                  </div>
                  <input
                  className='w-full h-full border-none rounded-lg pl-10 p-2 '
                    type='number'
                    {...register('nomorWA', {})}
                  />
                </div>
              </div>
              <div className='flex justify-start gap-5 flex-wrap'>
                <Radio
                  {...register('jkel')}
                  value='Laki-laki'
                  label='Laki-Laki'
                />
                <Radio
                  {...register('jkel')}
                  value='Perempuan'
                  label='Perempuan'
                />
                {/* <div className='flex gap-2'>
                  <input
                    {...register('jkel')}
                    type='radio'
                    value='Laki-laki'
                    id='laki'
                    className='default:bg-gray-500 border-gray-500 checked:bg-primary'
                  />
                  <label htmlFor='laki'>Laki-Laki</label>
                </div>
                <div className='flex gap-2'>
                  <input
                    {...register('jkel')}
                    type='radio'
                    value='Perempuan'
                    id='perempuan'
                  />
                  <label htmlFor='perempuan'>Perempuan</label>
                </div> */}
              </div>
              {loading ? (
                <div className='btn-submit flex items-center justify-center w-full h-14 bg-primary rounded-xl text-white text-2xl font-bold'>
                  <Loader
                    variant='dots'
                    size={80}
                    color='white'
                  />
                </div>
              ) : (
                <input
                  type='submit'
                  value='Simpan'
                  className='w-full h-14 bg-primary rounded-xl text-white text-2xl font-bold'
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
