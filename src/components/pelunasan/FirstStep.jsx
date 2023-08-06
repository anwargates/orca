import { Group, Select, Text } from '@mantine/core'
import React, { forwardRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { DatePickerInput } from '@mantine/dates'
import categoryList from '../../data/categoryList'
import { useNavigate } from 'react-router-dom'
import { dataPayment } from '../../data/paymentMethods'
import { Input } from '@mantine/core'
import moment from 'moment'

const dataLokasi = [
  {
    label: 'MRT Hj Nawi',
    value: 'MRT Hj Nawi',
  },

  {
    label: 'M Bloc',
    value: 'M Bloc',
  },
  {
    label: 'Blok M Square',
    value: 'Blok M Square',
  },
  {
    label: 'Sudirman',
    value: 'Sudirman',
  },
  {
    label: 'GBK',
    value: 'GBK',
  },
  {
    label: 'Lainnya...',
    value: 'Lain',
  },
]

const SelectPayment = forwardRef(function SelectItem(
  // @ts-ignore
  { image, ...others },
  ref
) {
  return (
    <div
      ref={ref}
      {...others}>
      <Group noWrap>
        <img
          width={100}
          src={image}
        />
      </Group>
    </div>
  )
})

const SelectLokasi = forwardRef(function SelectLokasi(
  // @ts-ignore
  { label, ...others },
  ref
) {
  return (
    <div
      ref={ref}
      {...others}>
      <Group noWrap>
        <Text size='sm'>{label}</Text>
      </Group>
    </div>
  )
})

export const FirstStep = ({ form, selected, handler }) => {
  const navigate = useNavigate()
  const [nextStep, prevStep] = handler
  const currentDate = new Date()
  const [date, setDate] = useState([null, null])
  // const [currentCategory, setCurrentCategory] = useState('')

  // useEffect(() => {
  //   // console.log(selected)
  //   const filtered = categoryList.filter((item) =>
  //     item.title.includes(selected.toUpperCase())
  //   )
  //   console.log(filtered[0])
  //   setCurrentCategory(filtered[0])
  //   console.log(currentCategory)
  // }, [])
  // @ts-ignore
  const generateOrderId = () => {
    const timestamp = Date.now().toString() // Generate a unique timestamp
    const randomString = Math.random().toString(36).substring(2, 8) // Generate a random string

    return `${randomString}${timestamp}`
  }

  const handleNext = () => {
    const validate = form.validate()
    // console.log(validate)
    // form.setFieldValue('tanggal', date)
    // form.setFieldValue('orderId', generateOrderId())
    // form.setFieldValue('max', currentCategory.max)
    // form.setFieldValue('price', currentCategory.max)
    form.setFieldValue('pelunasan', form.values.price * 1000 + parseInt(form.values.biayaTambahan))
    console.log(Object.keys(validate.errors).length)
    if (Object.keys(validate.errors).length === 0) nextStep()
  }

  // @ts-ignore
  const currentCategory = categoryList.find((item) =>
    item.title.includes(selected)
  )

  const formatTimestamp = (timestamp) => {
    const date = moment.unix(timestamp?.seconds)
    return date.format('Do MMMM YYYY')
  }

  return (
    <div className='grid gap-20 sm:px-6 lg:px-32'>
      {/* {console.log(form.values)} */}
      <div className='grid md:grid-cols-3 md:grid-rows-1 gap-2 rounded-3xl bg-[#88CEEF80] p-8 md:py-11 md:px-20'>
        <div className='md:col-span-2 md:col-start-2 md:row-start-1 text-left'>
          <h1 className='font-bold text-3xl capitalize'>{form.values?.kategori}</h1>
          <h2 className='mb-4 text-xl'>{form.values?.price*2}k/Jam</h2>
          <p className='text-xs'>
            *Harga diatas sesuai dengan ketentuan yang berlaku, apabila ada
            penambahan jumlah orang dan perubahan lokasi maka harga akan
            disesuaikan kembali.
          </p>
        </div>
        <div className='md:col-start-1 md:row-start-1'>
          <img
            className='w-48 h-40 object-cover m-auto rounded-lg'
            src={form.values?.kategoriImage}
            alt=''
          />
        </div>
      </div>

      {/* DROPDOWN SECTION */}
      <div className='grid md:grid-cols-2 gap-10 md:gap-20 px-2 md:px-0'>
        <div className='flex flex-col gap-2 md:gap-12 text-left text-xs'>
          <div className='flex flex-col gap-4'>
            <div className='text-left font-medium text-2xl'>
              Titik Lokasi Pemotretan
            </div>
            <div className='font-medium text-sm'>{form.values.lokasi}</div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='text-left font-medium text-2xl'>
              Tanggal Pemotretan
            </div>
            <div className='font-medium text-sm'>
              {formatTimestamp(form.values.tanggal[0])} -
              {formatTimestamp(form.values.tanggal[1])}
            </div>
          </div>
          <Select
            label='Metode Pembayaran'
            placeholder='Pilih Pembayaran'
            itemComponent={SelectPayment}
            data={dataPayment}
            radius='md'
            maxDropdownHeight={400}
            rightSection={<BsChevronDown size='1rem' />}
            rightSectionWidth={30}
            styles={dropdownStyle}
            transitionProps={{
              transition: 'pop-top-left',
              duration: 80,
              timingFunction: 'ease',
            }}
            value={form.values.metodePelunasan}
            onChange={(value) => form.setFieldValue('metodePelunasan', value)}
            error={form.errors.metodePelunasan}
            required
          />
        </div>
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-2 grid-rows-2 gap-4'>
            <div className='text-left font-medium text-2xl flex items-center justify-start'>Kategori Foto</div>
            <div className='text-right font-medium text-sm flex items-center justify-end capitalize'>
              {form.values.kategori}
            </div>
            <div className='text-left font-medium text-2xl flex items-center justify-start'>
              Total Pemesanan
            </div>
            <div className='text-right font-medium text-sm flex items-center justify-end'>
              Rp. {form.values.price}.000
            </div>
            <div className='text-left font-medium text-2xl flex items-center justify-start'>Biaya Tambahan</div>
            <div className='text-right font-medium text-sm flex items-center justify-end'>
              Rp.{' '}
              {form.values.biayaTambahan.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </div>
            <div className='text-left font-medium text-2xl flex items-center justify-start'>Catatan</div>
            <div className='text-right font-medium text-sm flex items-center justify-end capitalize'>
              {form.values.note}
            </div>
            <div className='text-left font-medium text-2xl flex items-center justify-start'>Total</div>
            <div className='text-right font-medium text-sm flex items-center justify-end'>
              {(parseInt(form.values.price) * 1000 + parseInt(form.values.biayaTambahan)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </div>
          </div>
          <div className='w-full h-0 border-2 border-black bg-black' />
          <button
            onClick={handleNext}
            className='flex bg-primary items-center justify-center text-white text-3xl font-semibold w-full h-20 rounded-xl'>
            Bayar
          </button>
        </div>
      </div>
    </div>
  )
}

const dropdownStyle = {
  item: {
    '&[data-selected]': {
      '&': {
        backgroundColor: '#FFFFFF',
        color: '#000000',
      },
      '&:hover': {
        backgroundColor: '#88CEEF',
        color: '#FFFFFF',
      },
    },
    '&[data-hovered]': {
      backgroundColor: '#88CEEF',
      color: '#FFFFFF',
    },
  },
  rightSection: {
    pointerEvents: 'none',
    marginRight: '34px',
  },
  input: {
    paddingInline: '34px',
    fontWeight: '500',
    height: '80px',
  },
}
