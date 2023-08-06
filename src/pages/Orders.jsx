import { Accordion, Image, Modal, ScrollArea, Stepper } from '@mantine/core'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { useDisclosure } from '@mantine/hooks'
import moment from 'moment/moment'
import { modals } from '@mantine/modals'
import { Link } from 'react-router-dom'

export const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = async () => {
    try {
      const paymentsCollection = collection(db, 'payments')
      const userIdQuery = query(
        paymentsCollection,
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      const querySnapshot = await getDocs(userIdQuery)
      const payments = querySnapshot.docs.map((doc) => {
        const paymentData = doc.data()
        paymentData.uid = doc.id // Add the UID (document ID) to the payment data
        return paymentData
      })
      setOrders(payments)
    } catch (error) {
      console.error('Error getting payments:', error)
      throw error
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = moment.unix(timestamp?.seconds)
    return date.format('Do MMMM YYYY')
  }

  const showModal = (modalData) => {
    modals.open({
      title: 'Detail Pesanan',
      styles: {
        title: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
        content: {
          borderRadius: '24px',
        },
      },
      children: (
        <>
          <div className='p-4'>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Harga</div>
              <div className=''>{modalData?.price}.000</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Nama</div>
              <div className=''>{modalData?.userName}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Bukti Pembayaran DP</div>
              <div
                onClick={() => {
                  modals.open({
                    title: 'Bukti Pembayaran',
                    styles: {
                      title: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                      },
                      content: {
                        borderRadius: '24px',
                      },
                    },
                    children: (
                      <>
                        <Image
                          className='min-w-[200px] min-h-[200px]'
                          withPlaceholder
                          styles={{
                            placeholder: {
                              minHeight: '200px',
                            },
                          }}
                          src={modalData?.bukti}
                          alt='payment-proof'
                        />
                      </>
                    ),
                  })
                }}>
                Lihat
              </div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Status</div>
              <div className=''>{modalData?.status}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Metode Pembayaran DP</div>
              <div className=''>{modalData?.metode}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Biaya Tambahan</div>
              <div className=''>{modalData?.biayaTambahan}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Tanggal Pemotretan</div>
              <div className=''>
                {formatTimestamp(modalData?.tanggal[0])} -
                {formatTimestamp(modalData?.tanggal[1])}
              </div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Kategori</div>
              <div className=''>{modalData?.kategori}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Catatan</div>
              <div className=''>{modalData?.note}</div>
            </div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Link Google Drive:</div>
              <div className=''>{modalData?.linkGoogleDrive}</div>
            </div>
          </div>
          {modalData?.statusCode === 4 && (
            <Link
              to={`/pelunasan`}
              state={modalData}
              onClick={() => modals.closeAll()}
              className='flex items-center justify-center py-2 bg-primary text-white rounded-lg'>
              Bayar Pelunasan
            </Link>
          )}
        </>
      ),
    })
  }

  return (
    <>
        <div className='container flex flex-col w-full lg:max-w-5xl overflow-scroll'>
          <Accordion chevron={null}>
            {orders.map((item, id) => (
              <>
                {console.log(item)}
                <Accordion.Item
                  key={id}
                  value={item.uid}>
                  <Accordion.Control>
                    <div className='flex flex-wrap gap-2 bg-primary rounded-2xl py-6 px-8'>
                      <div className='flex-[2] text-left'>
                        <h1
                          onClick={() => showModal(item)}
                          className='text-2xl font-bold mb-6 capitalize'>
                          {item.kategori}
                        </h1>
                        <h2 className='text-2xl font-bold mb-2'>
                          {item.price}k/Jam
                        </h2>
                        <p className='text-xs font-medium'>
                          *Harga diatas sesuai dengan ketentuan yang berlaku,
                          apabila ada penambahan jumlah orang dan perubahan
                          lokasi maka harga akan disesuaikan kembali.
                        </p>
                      </div>
                      <div className='flex flex-1 justify-end'>
                        <img
                          className='h-36 w-36 object-contain rounded-lg'
                          src={item.kategoriImage}
                          alt=''
                        />
                      </div>
                    </div>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stepper
                      color='#88CEEF'
                      active={item.statusCode}
                      orientation='vertical'
                      styles={{
                        stepBody: {
                          fontSize: '20px',
                        },
                        stepIcon: {
                          fontSize: 0,
                        },
                      }}
                      className='px-6'>
                      <Stepper.Step label='Pesanan diterima' />
                      <Stepper.Step label='Menunggu konfirmasi pembayaran DP' />
                      <Stepper.Step label='Pembayaran DP diterima' />
                      <Stepper.Step label='Pemotretan' />
                      <Stepper.Step label='Menunggu konfirmasi pembayaran pelunasan' />
                      <Stepper.Step label='Pembayaran pelunasan diterima' />
                    </Stepper>
                  </Accordion.Panel>
                </Accordion.Item>
              </>
            ))}
          </Accordion>
        </div>
    </>
  )
}
