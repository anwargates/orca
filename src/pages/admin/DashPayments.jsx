import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { db } from '../../config/firebase'
import { PaymentProofModal } from '../../components/modals/PaymentProofModal'
import { UpdateStatusModal } from '../../components/modals/UpdateStatusModal'
import { Pagination } from '@mantine/core'
import { usePagination } from '@mantine/hooks'

export const DashPayments = () => {
  const [payments, setPayments] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5

  const paymentsRef = collection(db, 'payments')
  const paymentsQuery = query(
    paymentsRef,
    orderBy('timestamp', 'desc'),
    limit(itemsPerPage)
  )

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const pagination = usePagination({ total: totalPages })

  const handlePageChange = (page) => {
    pagination.setPage(page)
  }

  // const getPayments = async () => {
  //   const data = []
  //   await getDocs(collection(db, 'payments')).then((res) => {
  //     console.log(res)
  //     res.forEach((doc) => {
  //       console.log(doc.data())
  //       data.push({ uid: doc.id, ...doc.data() })
  //     })
  //   })
  //   console.log(data)
  //   // @ts-ignore
  //   setPayments(data)
  // }

  const getPayments = async () => {
    const snapshot = await getCountFromServer(paymentsRef)
    setTotalItems(snapshot.data().count)
    try {
      let newQuery = paymentsQuery

      if (pagination.active > 1) {
        const lastVisiblePayment = payments[payments.length - 1]
        const lastVisibleTimestamp = lastVisiblePayment.timestamp

        newQuery = query(
          paymentsRef,
          orderBy('timestamp', 'desc'),
          startAfter(lastVisibleTimestamp),
          limit(itemsPerPage)
        )
      }

      const snapshot = await getDocs(newQuery)
      const paymentData = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }))
      // @ts-ignore
      setPayments(paymentData)
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  useEffect(() => {
    getPayments()
  }, [pagination.active])

  return (
    <>
      {console.log(payments)}
      <div className='flex p-4 gap-4 flex-col w-full'>
        <div className='flex items-center justify-center w-72 h-12 bg-primary text-white font-bold text-xl rounded-lg'>
          Konfirmasi Pembayaran
        </div>
        <div className='border w-full border-black'></div>
        <div className='table w-full ...'>
          <div className='table-header-group bg-primary text-white h-24 text-center font-bold text-xs'>
            <div className='table-row'>
              <div className='table-cell text-center align-middle'>
                No. Pembayaran
              </div>
              <div className='table-cell text-center align-middle'>
                Metode Pembayaran
              </div>
              <div className='table-cell text-center align-middle'>
                Nama Lengkap
              </div>
              <div className='table-cell text-center align-middle'>
                Kategori Foto
              </div>
              <div className='table-cell text-center align-middle'>
                Total Pembayaran
              </div>
              <div className='table-cell text-center align-middle'>
                Bukti Pembayaran
              </div>
              <div className='table-cell text-center align-middle'>
                Status Pembayaran
              </div>
              <div className='table-cell text-center align-middle'>Aksi</div>
            </div>
          </div>
          <div className='table-row-group text-sm font-medium'>
            {payments.map((item) => (
              <div
                // @ts-ignore
                key={item.uid}
                className='table-row even:bg-[#88CEEF1F] h-16'>
                <div className='table-cell text-center align-middle'>
                  {
                    // @ts-ignore
                    item.uid
                  }
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  {
                    // @ts-ignore
                    item.metode
                  }
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  {
                    // @ts-ignore
                    item.userName
                  }
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  {
                    // @ts-ignore
                    item.kategori
                  }
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  Rp.{' '}
                  {
                    // @ts-ignore
                    item.price
                  }
                  .000
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  <PaymentProofModal
                    url={
                      // @ts-ignore
                      item.bukti
                    }
                  />
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  <UpdateStatusModal
                    // @ts-ignore
                    item={item}
                  />
                </div>
                <div className='table-cell text-center align-middle capitalize'>
                  <div className='hover:cursor-pointer rounded-full'>
                    <IoLogoWhatsapp className='text-green-300 text-3xl m-auto' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          total={totalPages}
          value={pagination.active}
          onChange={handlePageChange}
          position='right'
          variant='outline'
          color='blue'
          size='md'
        />
      </div>
    </>
  )
}
