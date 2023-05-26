import { Accordion, ScrollArea, Stepper } from '@mantine/core'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'

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

  return (
    <>
      <ScrollArea h='85vh'>
        <div className='container flex flex-col w-full lg:max-w-5xl overflow-scroll'>
          <Accordion chevron={null}>
            {orders.map((item, id) => (
              <>
                {console.log(item)}
                <Accordion.Item
                  key={id}
                  value={item.uid}>
                  <Accordion.Control>
                    <div className='flex bg-primary rounded-2xl py-6 px-8'>
                      <div className='flex-[2] text-left'>
                        <h1 className='text-2xl font-bold mb-6 capitalize'>
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
                          className='h-36 object-contain rounded-lg'
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
      </ScrollArea>
    </>
  )
}
