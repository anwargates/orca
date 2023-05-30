import { Group, Select, Text } from '@mantine/core'
import React, { forwardRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { DatePickerInput } from '@mantine/dates'
import categoryList from '../../data/categoryList'
import { useNavigate } from 'react-router-dom'
import { dataPayment } from '../../data/paymentMethods'

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
  // @ts-ignore
  const [nextStep, prevStep] = handler
  const currentDate = new Date()
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
    // form.setFieldValue('orderId', generateOrderId())
    // form.setFieldValue('max', currentCategory.max)
    // form.setFieldValue('price', currentCategory.max)
    if (Object.keys(validate.errors).length === 0) nextStep()
  }

  // @ts-ignore
  const currentCategory = categoryList.find((item) =>
    item.title.includes(selected)
  )

  return (
    <div className='grid grid-cols-2 grid-rows-3 gap-20 px-32'>
      {/* {console.log(form.values)} */}
      <div className='col-span-2'>
        <div className='grid grid-cols-4 grid-rows-1 gap-2 rounded-3xl bg-[#88CEEF80] py-11 px-20'>
          <div className='col-span-2 col-start-2 row-start-1 text-left'>
            <h1 className='font-bold text-3xl capitalize'>{selected?.title}</h1>
            <h2 className='mb-4 text-xl'>{selected?.price}k/Jam</h2>
            <p className='text-xs'>
              *Harga diatas sesuai dengan ketentuan yang berlaku, apabila ada
              penambahan jumlah orang dan perubahan lokasi maka harga akan
              disesuaikan kembali.
            </p>
          </div>
          <div className='col-start-1 row-start-1'>
            <img
              className='w-48 h-40 object-cover rounded-lg'
              src={selected?.image[0] ?? ''}
              alt=''
            />
          </div>
          <div className='col-start-4 row-start-1 flex items-center justify-center'>
            <button
              onClick={() => navigate('/photo-category', { replace: true })}
              className='flex rounded-lg bg-white
             text-primary items-center justify-center w-60 h-20 font-semibold text-2xl'>
              Ubah Pesanan
            </button>
          </div>
        </div>
      </div>
      {/* DROPDOWN SECTION */}
      <div className='flex flex-col gap-12 row-span-2 row-start-2 text-left text-xs'>
        <Select
          label='Titik Lokasi Pemotretan'
          placeholder='Pilih Lokasi'
          defaultValue='Blok M'
          itemComponent={SelectLokasi}
          data={dataLokasi}
          radius='md'
          maxDropdownHeight={400}
          rightSection={<BsChevronDown size='1rem' />}
          rightSectionWidth={30}
          // @ts-ignore
          styles={dropdownStyle}
          transitionProps={{
            transition: 'pop-top-left',
            duration: 80,
            timingFunction: 'ease',
          }}
          value={form.values.lokasi}
          onChange={(value) => form.setFieldValue('lokasi', value)}
          error={form.errors.lokasi}
          required
        />
        <DatePickerInput
          label='Tanggal Pemotretan'
          placeholder='Pilih Tanggal'
          type='range'
          radius='md'
          rightSection={<BsChevronDown size='1rem' />}
          rightSectionWidth={30}
          // value={date}
          // onChange={setDate}
          closeOnChange={false}
          // @ts-ignore
          styles={dropdownStyle}
          minDate={currentDate}
          value={form.values.tanggal}
          onChange={(value) => form.setFieldValue('tanggal', value)}
          error={form.errors.tanggal}
          required
        />
        <Select
          label='Metode Pembayaran'
          placeholder='Pilih Pembayaran'
          itemComponent={SelectPayment}
          data={dataPayment}
          radius='md'
          maxDropdownHeight={400}
          rightSection={<BsChevronDown size='1rem' />}
          rightSectionWidth={30}
          // @ts-ignore
          styles={dropdownStyle}
          transitionProps={{
            transition: 'pop-top-left',
            duration: 80,
            timingFunction: 'ease',
          }}
          value={form.values.metode}
          onChange={(value) => form.setFieldValue('metode', value)}
          error={form.errors.metode}
          required
        />
      </div>
      <div className='flex flex-col gap-8 row-span-2 row-start-2'>
        <div className='h-28 px-6 flex justify-center items-center text-xl font-medium text-left border-2 rounded-xl'>
          Note : Pembayaran Dp 50% dari total harga per kategori foto
        </div>
        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          <div className='text-left font-medium text-2xl'>Kategori Foto</div>
          <div className='text-right font-medium text-sm capitalize'>
            {form.values.kategori}
          </div>
          <div className='text-left font-medium text-2xl'>Total Pemesanan</div>
          <div className='text-right font-medium text-sm'>
            Rp. {form.values.price}.000
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
