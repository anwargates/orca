import { Button, Group, Stepper } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FirstStep } from '../components/payments/FirstStep'
import { SecondStep } from '../components/payments/SecondStep'
import { ThirdStep } from '../components/payments/ThirdStep'
import { auth } from '../config/firebase'
import categoryList from '../data/categoryList'

export const Payment = () => {
  const { id } = useParams()

  const generateOrderId = () => {
    const timestamp = Date.now().toString() // Generate a unique timestamp
    const randomString = Math.random().toString(36).substring(2, 8) // Generate a random string

    return `${randomString}${timestamp}`
  }
  // @ts-ignore
  const currentCategory = categoryList.find((item) => item.title.includes(id))

  const [active, setActive] = useState(0)

  const form = useForm({
    initialValues: {
      lokasi: '',
      tanggal: [null, null],
      metode: '',
      orderId: generateOrderId(),
      kategori: currentCategory.title,
      kategoriImage: currentCategory.image[0],
      max: currentCategory.max,
      price: currentCategory.price / 2,
      userName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      // bukti: null,
    },
    validate: {
      lokasi: (value) => (!value ? 'Mohon Diisi' : null),
      tanggal: (value) =>
        value.some((element) => element === null) ? 'Mohon Diisi' : null,
      metode: (value) => (!value ? 'Mohon Diisi' : null),
      // bukti: (value) => (!value ? 'Mohon Diisi' : null),
    },
  })

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current))
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const HeaderText = (i) => {
    switch (i) {
      case 0:
        return 'PEMESANAN'
      case 1:
        return 'PEMBAYARAN'
      case 2:
        return 'SELESAI'
      default:
        return
    }
  }

  const StepContent = ({ step }) => {
    const contentProps = {
      form: form,
      selected: currentCategory,
      handler: [nextStep, prevStep],
    }
    switch (step) {
      case 0:
        return <FirstStep {...contentProps} />
      case 1:
        return <SecondStep {...contentProps} />
      case 2:
        return <ThirdStep {...contentProps} />
      default:
        return null
    }
  }

  return (
    <>
      <section className='default-container my-[13vh]'>
        <h1 className='text-5xl font-bold mb-7'>{HeaderText(active)}</h1>
        <div className='max-w-xs m-auto mb-16'>
          <Stepper
            active={active}
            breakpoint='sm'
            color='#88CEEF'
            size='xl'>
            <Stepper.Step />
            <Stepper.Step />
            <Stepper.Step />
          </Stepper>
        </div>
        <StepContent step={active} />
        {/* <Group
          position='center'
          mt='xl'>
          <Button
            variant='default'
            onClick={prevStep}>
            Back
          </Button>
          <Button
            variant='blue'
            onClick={nextStep}>
            Next step
          </Button>
        </Group> */}
      </section>
    </>
  )
}
