import React, { useEffect, useState } from 'react'
import LogoOrca from '../assets/logo-orca.svg'
import { useForm } from 'react-hook-form'
import { auth, db } from '../config/firebase'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePhoneNumber,
  updateProfile,
} from 'firebase/auth'
import { useDisclosure } from '@mantine/hooks'
import { FormReauthModal } from '../components/modals/FormReauthModal'
import { Notification, Tooltip } from '@mantine/core'
import { BsCheckCircleFill, BsX } from 'react-icons/bs'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { BeatLoader } from 'react-spinners'

export const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm()
  const [isModalOpened, toggleModal] = useDisclosure(false)
  const [isNotify, toggleNotify] = useDisclosure(false)
  const [isNotifyWrongPassword, toggleNotifyWrongPassword] =
    useDisclosure(false)
  const [loading, toggleLoading] = useDisclosure(false)
  const isNotEmailEditable =
    auth.currentUser.providerData[0].providerId !== 'password'

  // console.log('provider check', isNotEmailEditable)
  // console.log('form values', getValues())

  useEffect(() => {
    getUserProfile()
  }, [])

  // GET FIRESTORE USER PROFILE ON PAGE LOAD
  const getUserProfile = () => {
    const userRef = doc(db, 'users', auth.currentUser.uid)
    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists())
        reset({
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          nomorWA: docSnap.data().phoneNumber,
          jkel: docSnap.data().gender,
        })
    })
  }

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
      auth.currentUser.email,
      password.password
    )
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

    await updateEmail(auth.currentUser, data.email)
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
    })

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
        <div className='col-span-2 flex items-center justify-center p-8'>
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
                name='nama'
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
                  name='email'
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
              <input
                className='w-full h-10 border rounded-lg border-black p-2'
                type='number'
                name='nomorWA'
                {...register('nomorWA', {})}
              />
            </div>
            <div className='flex justify-start gap-5 flex-wrap'>
              <div className='flex gap-2'>
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
              </div>
            </div>
            {loading ? (
              <div className='btn-submit flex items-center justify-center w-full h-14 bg-primary rounded-xl text-white text-2xl font-bold'>
                <BeatLoader color='#ffffff' />
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
    </>
  )
}
