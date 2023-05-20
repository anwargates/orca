import { Modal, Notification } from '@mantine/core'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db } from '../../config/firebase'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePhoneNumber,
  updateProfile,
} from 'firebase/auth'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useDisclosure } from '@mantine/hooks'
import { doc } from 'firebase/firestore'
import { reauthStore } from '../../global/store'
import { DatePicker } from '@mantine/dates'

export const DatePickerModal = ({
  opened,
  modalHandler,
  dateHandler,
  date,
  loadingHandler,
}) => {
  const [pending, setPending] = useState(false)
  const [isNotify, toggleNotify] = useDisclosure(false)
  //   const [password, setPassword] = useState('')
//   const [date, setDate] = useState([null, null]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleClose = () => {
    modalHandler.close()
    loadingHandler.close()
  }

  //   const { setReauthFormState } = reauthStore()

  //   const submitReauth = (data) => {
  //     setReauthFormState(data)
  //     modalHandler.close()
  //   }

  //   const doUpdateProfile = async (data) => {
  //     console.log('reauth form data', data)
  //     const cred = EmailAuthProvider.credential(data.email, data.password)
  //     await reauthenticateWithCredential(auth.currentUser, cred)

  //     if (formData.email) {
  //       await updateEmail(auth.currentUser, formData.email)
  //     }
  //     if (formData.displayName)
  //       await updateProfile(auth.currentUser, {
  //         displayName: formData.displayName,
  //       })

  //     if (formData.nomorWA || formData.jkel) {
  //       const userRef = doc(db, 'users', auth.currentUser.uid)
  //       await updateDoc(userRef, {
  //         phoneNumber: formData.nomorWA,
  //         gender: formData.jkel,
  //         isProfileCompleted: true,
  //       })
  //     }
  //   }

  return (
    <>
      {/* NOTIFICATION */}
      {/* <Notification
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
      </Notification> */}

      {/* MODAL */}
      <Modal
        opened={opened}
        onClose={handleClose}
        title='Verifikasi Akun'
        centered>
        <DatePicker
          type='range'
          value={date}
        //   onChange={setDate}
          onChange={dateHandler}
        />
      </Modal>
    </>
  )
}
