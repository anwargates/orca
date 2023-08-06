import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

export const ThirdStep = ({ form, selected, handler }) => {
  const formatTimestamp = (timestamp) => {
    const date = moment.unix(timestamp?.seconds)
    return date.format('Do MMMM YYYY')
  }
  return (
    <>
      <div className='px-10 xl:px-60'>
        <h2 className='font-bold text-3xl'>
          Terimakasih. Orderan kamu sudah kami terima
        </h2>
        <p className='font-medium text-base'>
          Admin akan segera menghubungimu melalui Whatsapp untuk invoice dan
          info lebih lanjut
        </p>
        <div className='my-16 rounded-lg border border-black'>
          <table className='table w-full'>
            <thead className='table-header-group border-b-2 h-16 border-black'>
              <tr className='table-row font-semibold'>
                <td className='table-cell'>No. Pesanan</td>
                <td className='table-cell'>Tanggal</td>
                <td className='table-cell'>Total</td>
                <td className='table-cell'>Metode Pembayaran</td>
              </tr>
            </thead>
            <tbody className='table-row-group h-20'>
              <tr className='table-row font-semibold text-lg'>
                <td className='table-cell'>{form.values.orderId}</td>
                <td className='table-cell'>
                  {formatTimestamp(form.values.tanggal[0]) +
                    ' - ' +
                    formatTimestamp(form.values.tanggal[1])}
                </td>
                <td className='table-cell'>{form.values.pelunasan?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                <td className='table-cell'>{form.values.metodePelunasan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          className='flex items-center justify-center m-auto text-center rounded-3xl text-white w-64 h-12 bg-primary'
          to={'/'}>
          Lihat Pesanan
        </Link>
      </div>
    </>
  )
}
