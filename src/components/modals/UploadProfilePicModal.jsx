import {
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  Notification,
  Text,
  rem,
} from '@mantine/core'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth, db, storage } from '../../config/firebase'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePhoneNumber,
  updateProfile,
} from 'firebase/auth'
import {
  BsCheckCircleFill,
  BsCameraFill,
  BsCloudUpload,
  BsX,
  BsImage,
} from 'react-icons/bs'
import { useDisclosure } from '@mantine/hooks'
import { doc } from 'firebase/firestore'
import { reauthStore } from '../../global/store'
import { BeatLoader } from 'react-spinners'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

export const UploadProfilePicModal = ({ opened, modalHandler }) => {
  const fileInputRef = useRef(null)
  const [pending, setPending] = useState(false)
  const [isNotify, toggleNotify] = useDisclosure(false)
  //   const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const [file, setFile] = useState(null)

  // FORM HANDLER
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // HANDLE ON MODAL CLOSE
  const handleClose = () => {
    modalHandler.close()
  }

  // HANDLE FILE CHANGE
  const handleChange = (selectedFiles) => {
    console.log(selectedFiles)
    setFile(selectedFiles[0])
    setError(null)
  }

  // HANDLE PIC UPLOAD
  const handleUploadProfilePic = () => {
    setPending(true)
    if (!file) {
      setError('Please select a file to upload')
      return
    }
    // const imageRef = ref(storage, `profilePics/${file.name + v4()}`)
    const imageRef = ref(storage, `profilePics/${v4()}`)
    uploadBytes(imageRef, file).then((res) => {
      getDownloadURL(res.ref).then((url) => {
        updateProfile(auth.currentUser, { photoURL: url })
        toggleNotify.open()
        setPending(false)
        handleClose()
      })
    })
  }

  return (
    <>
      {/* NOTIFICATION */}
      <Notification
        icon={<BsCheckCircleFill size='1.1rem' />}
        color='teal'
        title='UPDATE PROFIL PICTURE BERHASIL'
        className={`absolute z-50 left-0 right-0 w-fit m-auto transition-all ease-in-out ${
          isNotify ? 'top-2' : '-top-28'
        }`}
        onClose={() => {
          toggleNotify.close()
          window.location.reload()
        }}>
        Profile Picture sudah diperbarui, silakan muat ulang halaman
      </Notification>

      {/* MODAL */}
      <Modal
        opened={opened}
        onClose={handleClose}
        className='relative'
        title='Upload Foto Profile'
        centered>
        {/* LOADING OVERLAY */}
        <LoadingOverlay
          loader={
            <Loader
              variant='dots'
              size={80}
            />
          }
          visible={pending}
          overlayBlur={2}
        />

        <Dropzone
          onDrop={handleChange}
          onReject={(files) => console.log('rejected files', files)}
          // maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          // loading={true}
          maxFiles={1}>
          <Group className='flex justify-center items-center gap-6 h-52'>
            <Dropzone.Accept>
              <BsCloudUpload size={80} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <BsX size={80} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              {file ? (
                <>
                  <div className='flex flex-col justify-center items-center'>
                    <img
                      src={URL.createObjectURL(file)}
                      className='w-40 h-40 mb-2'
                    />
                    <span className='text-xl inline'>
                      Click upload if ready
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex flex-col justify-center items-center'>
                    <BsImage
                      className='mb-10'
                      size={80}
                    />
                    <span className='text-xl inline'>
                      Drag images here or click to select files
                    </span>
                    <span className='text-sm text-slate-500 inline'>
                      File should not exceed 5mb
                    </span>
                  </div>
                </>
              )}
            </Dropzone.Idle>
          </Group>
        </Dropzone>
        {/* <div
            className='w-full h-52 flex justify-center items-center bg-white cursor-pointer caret-transparent p-2 rounded-2xl border-gray-500 border'
            onClick={() => {
              fileInputRef.current.click()
            }}>
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className='w-52 h-52'
              />
            ) : (
              <BsCameraFill className='text-[13rem]' />
            )}
          </div>
          <input
            type='file'
            name=''
            id=''
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
          /> */}
        <button
          className='flex justify-center items-center bg-primary w-full mt-6 h-6 p-6 rounded-xl text-white'
          disabled={pending ? true : false}
          onClick={handleUploadProfilePic}>
          {pending ? (
            <BeatLoader
              size={16}
              color='#ffffff'
            />
          ) : (
            'Upload'
          )}
        </button>

        {/* SHOW LOADING ANIMATION */}
        {/* {pending ? (
            <div className='btn-submit flex items-center justify-center'>
              <BeatLoader color='#ffffff' />
            </div>
          ) : (
            <input
              className='btn-submit'
              type='submit'
              value='Verifikasi'
            />
          )}
        </form> */}
      </Modal>
    </>
  )
}
