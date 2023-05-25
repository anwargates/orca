// @ts-nocheck
import { FileInput, Loader, LoadingOverlay } from '@mantine/core'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import moment from 'moment'
import 'moment/locale/id'
import React, { useRef, useState } from 'react'
import { v4 } from 'uuid'
import CClogo from '../../assets/cc-logo.svg'
import { auth, database, db, storage } from '../../config/firebase'
import categoryList from '../../data/categoryList'
import { dataPayment } from '../../data/paymentMethods'
import { push, set, ref as dbRef } from 'firebase/database'

export const SecondStep = ({ form, selected, handler }) => {
  moment().locale('id')
  const inputRef = useRef(null)
  const [nextStep, prevStep] = handler
  const [pending, setPending] = useState(false)
  const [file, setFile] = useState(null)

  const handleNext = () => {
    const validate = form.validate()
    console.log(validate)
    if (Object.keys(validate.errors).length === 0) nextStep()
  }

  const handleChange = (selectedFile) => {
    console.log(selectedFile)
    setFile(selectedFile)
  }

  // HANDLE PIC UPLOAD
  const handleUploadBukti = () => {
    setPending(true)
    if (!file) {
      // setError('Please select a file to upload')
      setPending(false)
      return
    }
    // const imageRef = ref(storage, `profilePics/${file.name + v4()}`)
    const imageRef = ref(storage, `buktiPembayaran/${v4()}`)
    uploadBytes(imageRef, file)
      .then((res) => {
        console.log(res)
        getDownloadURL(res.ref).then((url) => {
          handleCreateDoc(url)
        })
      })
      .catch((e) => console.log(e))
    // .finally(setPending(false))
  }

  const currentCategory = categoryList.find((item) =>
    item.title.includes(selected)
  )

  const currentPaymentMethod = dataPayment.find((item) => {
    console.log(item)
    console.log(form.metode)
    return item.value.includes(form.values.metode)
  })

  const handleCreateDoc = async (url) => {
    const { orderId, ...rest } = form.values
    await setDoc(doc(db, 'payments', orderId), {
      ...rest,
      bukti: url,
      status: 'Pembayaran DP',
      timestamp: serverTimestamp(),
    })
      .then((res) => {
        console.log('create doc success', res)
        handleNotify()
        nextStep()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleNotify = () => {
    const adminNotificationsRef = dbRef(
      database,
      `notifications/adminNotifications/${auth.currentUser.uid}`
    )

    // Generate a unique ID for the notification
    const newNotificationRef = push(adminNotificationsRef)

    // Set the data for the notification
    set(newNotificationRef, {
      title: 'Pembayaran DP baru!',
      message: 'Silakan cek tabel pembayaran',
      timestamp: new Date().getTime(),
      read: false,
    })
      .then(() => {
        console.log('Notification created successfully for admin.')
      })
      .catch((error) => {
        console.error('Error creating notification for admin:', error)
      })
  }

  return (
    <div className='grid grid-cols-3 grid-rows-1 gap-10 pl-32 pr-20 h-[800px] relative'>
      <LoadingOverlay
        visible={pending}
        loader={
          <Loader
            variant='dots'
            size={80}
          />
        }
        overlayBlur={2}
      />
      {console.log(form.values)}
      <div className='grid grid-cols-2 grid-rows-9 gap-4 col-span-2 mr-10'>
        <div className='col-span-2'>
          <div className='w-full bg-primary rounded-xl font-bold text-4xl text-white p-5 '>
            Ringkasan Pemesanan
          </div>
        </div>
        <div className='font-semibold text-3xl text-black text-left'>
          Nomor Pesanan
        </div>
        <div className='font-medium text-2xl text-black text-right'>
          {form.values.orderId}
        </div>
        <div className='font-semibold text-3xl text-black text-left'>
          Kategori Foto
        </div>
        <div className='font-medium text-2xl text-black text-right capitalize'>
          {form.values.kategori}
        </div>
        <div className='font-semibold text-3xl text-black text-left'>
          Lokasi Pemotretan
        </div>
        <div className='font-medium text-2xl text-black text-right'>
          {form.values.lokasi}
        </div>
        <div className='font-semibold text-3xl text-black text-left'>
          Tanggal Pemotretan
        </div>
        <div className='font-medium text-2xl text-black text-right'>
          {moment(form.values.tanggal[0]).format('Do MMMM YYYY') +
            ' - ' +
            moment(form.values.tanggal[1]).format('Do MMMM YYYY')}
        </div>
        <div className='font-semibold text-3xl text-black text-left'>
          Jumlah Orang
        </div>
        <div className='font-medium text-2xl text-black text-right'>
          {form.values.max}
        </div>
        <div className='col-span-2 row-start-7'>
          <div className='w-full border-2 border-black' />
        </div>
        <div className='col-span-2 flex mb-4'>
          <div className='flex w-60 bg-primary text-white font-semibold text-3xl items-center justify-center rounded-l-md'>
            <p className='self-center text-center'>Pilih File</p>
          </div>
          <div
            className='w-full h-full rounded-l-none rounded-r-md border border-primary flex items-center justify-center text-primary text-2xl font-light hover:cursor-pointer'
            onClick={() => inputRef.current.click()}>
            {file?.name ?? 'Tidak ada file yang dipilih'}
          </div>
          <FileInput
            ref={inputRef}
            onChange={handleChange}
            hidden
            accept='image/png,image/jpeg'
          />
        </div>
        <button
          className='col-span-2 flex w-full bg-primary rounded-xl font-bold text-4xl text-white p-5 items-center justify-center'
          onClick={handleUploadBukti}>
          Upload Bukti Pembayaran
        </button>
      </div>
      <div className='col-start-3'>
        <div className='w-full h-full relative'>
          <div className='absolute w-full h-[660px] bg-primary bottom-0 rounded-3xl' />
          <div className='relative w-full h-full bg-transparent flex flex-col items-center justify-around'>
            <div className='z-10 h-[625px] w-[320px] bg-white rounded-[70px] border-primary border-4 flex flex-col items-center justify-evenly px-8'>
              <div className='h-[270px]'>
                <img
                  className='object-cover'
                  src={currentPaymentMethod?.qr}
                  alt=''
                />
              </div>
              <div className='text-left grid grid-flow-row gap-3'>
                <h3 className='font-bold text-xl text-black'>
                  {currentPaymentMethod?.atasNama}
                </h3>
                <h4 className='font-medium text-xl text-black'>
                  {currentPaymentMethod?.noRekening}
                </h4>
              </div>
              <div className=''>
                <img
                  src={currentPaymentMethod?.image}
                  alt=''
                />
              </div>
            </div>
            <div className='w-[320px] h-[123px] bg-white shadow-md rounded-lg text-left flex flex-col justify-center items-start px-7 gap-2 relative'>
              <p className='font-bold text-xl opacity-50'>Total Pesanan</p>
              <p className='font-bold text-4xl'>{form.values.price}.000</p>
              <div className='absolute bottom-5 right-5'>
                <img
                  src={CClogo}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
