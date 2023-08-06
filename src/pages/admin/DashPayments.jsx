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
import { Group, Loader, LoadingOverlay, Pagination } from '@mantine/core'
import { usePagination } from '@mantine/hooks'
import { useStore } from '../../global/store'
import { Table } from 'antd'

const columns = [
  {
    title: 'Kode Pembayaran',
    dataIndex: 'uid',
    key: 'uid',
  },
  {
    title: 'Metode DP',
    dataIndex: 'metode',
    key: 'metode',
  },
  {
    title: 'Metode Pelunasan',
    dataIndex: 'metodePelunasan',
    key: 'metodePelunasan',
  },
  {
    title: 'Nama Lengkap',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    title: 'Kategori Foto',
    dataIndex: 'kategori',
    key: 'kategori',
    render: (text) => <div className='capitalize'>{text}</div>,
  },
  {
    title: 'Pembayaran DP',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <div>{text}.000</div>,
  },
  {
    title: 'Biaya Tambahan',
    dataIndex: 'biayaTambahan',
    key: 'biayaTambahan',
    render: (text) => <div>{text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>,
  },
  {
    title: 'Pembayaran Pelunasan',
    dataIndex: 'pelunasan',
    key: 'pelunasan',
    render: (text) => (
      <div>{text?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <div>{text}</div>
    ),
  },
  {
    title: 'Detail Pesanan',
    key: 'detail',
    // fixed: 'right',
    width: 150,
    render: (_, record) => (
      <div>
        <PaymentProofModal
          url={record.bukti}
          urlPelunasan={record.buktiPelunasan}
        />
      </div>
    ),
  },
  {
    title: 'Status Pembayaran',
    key: 'status',
    // fixed: 'right',
    width: 150,
    render: (_, record) => (
      <div>
        <UpdateStatusModal item={record} />
      </div>
    ),
  },
  {
    title: 'Aksi',
    key: 'aksi',
    // fixed: 'right',
    width: 80,
    render: (_, record) => (
      <div>
        <div
          onClick={() => {
            const linkGrupWhatsapp =
              'https%3A%2F%2Fchat.whatsapp.com%2FIFSL0IwH7MfE5RkRfQPGo0'
            const encodedMessage = `Haii%2C%20${record.userName}%21%0A%0ABerikut%20invoice%20dari%20berlangganan%20kelas%20${record.kategori}%20di%20Kursus%20Editing%20Ruang%20Edit%20dengan%20nomor%20transaksi%20${record.uid}%0A%0AUntuk%20info%20kelas%20lebih%20lengkap%2C%20silahkan%20bergabung%20ke%20grup%20komunitas%20Ruang%20Edit%20%3A%20%0A${linkGrupWhatsapp}%0A%0ATerimakasih%21
            `
            // window.open(
            //   `https://api.whatsapp.com/send?phone=${item.nomorTelepon}&text=${encodedMessage}`
            // )
            window.open(
              `https://api.whatsapp.com/send?phone=6285892716319&text=${encodedMessage}`
            )
          }}
          className='hover:cursor-pointer rounded-full'>
          <IoLogoWhatsapp className='text-green-300 text-3xl m-auto' />
        </div>
      </div>
    ),
  },
]

export const DashPayments = () => {
  const [payments, setPayments] = useState([])
  const [pending, setPending] = useState(true)

  const paymentsRef = collection(db, 'payments')
  const paymentsQuery = query(paymentsRef, orderBy('timestamp', 'desc'))

  const getPayments = async () => {
    setPending(true)
    try {
      const snapshot = await getDocs(paymentsQuery)
      const paymentData = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }))
      setPayments(paymentData)
      setPending(false)
    } catch (error) {
      console.error('Error fetching payments:', error)
      setPending(false)
    }
  }

  const handleSendClick = (item) => {
    const linkGrupWhatsapp =
      'https%3A%2F%2Fchat.whatsapp.com%2FIFSL0IwH7MfE5RkRfQPGo0'
    const encodedMessage = `Haii%2C%20${item.userName}%21%0A%0ABerikut%20invoice%20dari%20berlangganan%20kelas%20${item.kategori}%20di%20Kursus%20Editing%20Ruang%20Edit%20dengan%20nomor%20transaksi%20${item.uid}%0A%0AUntuk%20info%20kelas%20lebih%20lengkap%2C%20silahkan%20bergabung%20ke%20grup%20komunitas%20Ruang%20Edit%20%3A%20%0A${linkGrupWhatsapp}%0A%0ATerimakasih%21
    `
    // window.open(
    //   `https://api.whatsapp.com/send?phone=${item.nomorTelepon}&text=${encodedMessage}`
    // )
    window.open(
      `https://api.whatsapp.com/send?phone=6285892716319&text=${encodedMessage}`
    )
  }

  useEffect(() => {
    getPayments()
  }, [])

  return (
    <>
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
      <div className='flex p-4 gap-4 flex-col w-full'>
        <div className='flex items-center justify-center w-72 h-12 bg-primary text-white font-bold text-xl rounded-lg'>
          Konfirmasi Pembayaran
        </div>
        <div className='border w-full border-black'></div>
        <Table
          scroll={{ x: '1440px' }}
          loading={pending}
          pagination={{
            position: ['bottomRight'],
          }}
          dataSource={payments}
          columns={columns}
          className='custom-table text-sm font-medium'
          rowKey='uid'
          // onRow={rowProps}
        />
        {/* <div className='table w-full ...'>
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
                  <div
                  onClick={()=>handleSendClick(item)}
                  className='hover:cursor-pointer rounded-full'>
                    <IoLogoWhatsapp className='text-green-300 text-3xl m-auto' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Pagination.Root
          total={totalPages}
          value={pagination.active}
          onChange={handlePageChange}
          styles={{
            control: {
              backgroundColor: '#88CEEF',
              '&[type="button"]': {
                height: '74px',
              },
              '&[data-active]': {
                backgroundColor: '#88CEEF',
              },
            },
          }}
          // color='#88CEEF'
          size='md'>
          <Group
            position='right'
            spacing={0}>
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
          </Group>
        </Pagination.Root> */}
      </div>
    </>
  )
}
