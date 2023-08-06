import { Group, Input, Modal, NativeSelect, Select, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ref as dbRef, push, set } from 'firebase/database'
import { doc, updateDoc } from 'firebase/firestore'
import React, { forwardRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { database, db } from '../../config/firebase'
import { useStore } from '../../global/store'

// const dataStatus = [
//   'Pembayaran DP',
//   'Verifikasi DP Diterima',
//   'Verifikasi DP Ditolak',
//   'Pembayaran Pelunasan',
//   'Verifikasi Pelunasan Diterima',
//   'Verifikasi Pelunasan Ditolak',
// ]

const dataStatus = [
  {
    label: 'Pembayaran DP',
    value: 'Pembayaran DP',
    statuscode: 1,
    color: '#FFEFB0',
  },
  {
    label: 'Verifikasi DP Diterima',
    value: 'Verifikasi DP Diterima',
    statuscode: 3,
    color: '#FFEFB0',
  },
  {
    label: 'Verifikasi DP Ditolak',
    value: 'Verifikasi DP Ditolak',
    statuscode: 1,
    color: '#FFEFB0',
  },
  {
    label: 'Pembayaran Pelunasan',
    value: 'Pembayaran Pelunasan',
    statuscode: 4,
    color: '#FFEFB0',
  },
  {
    label: 'Verifikasi Pelunasan Diterima',
    value: 'Verifikasi Pelunasan Diterima',
    statuscode: 6,
    color: '#FFEFB0',
  },
  {
    label: 'Verifikasi Pelunasan Ditolak',
    value: 'Verifikasi Pelunasan Ditolak',
    statuscode: 4,
    color: '#FFEFB0',
  },
]

const SelectStatus = forwardRef(function SelectStatus(
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

const getStatusCode = (status) => {
  const found = dataStatus.find((i) => i.value === status)
  return found?.statuscode??1
}

export const UpdateStatusModal = ({ item }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [status, setStatus] = useState(item.status)
  const [note, setNote] = useState('')
  const [biayaTambahan, setBiayaTambahan] = useState(0)
  const [linkGoogleDrive, setLinkGoogleDrive] = useState('')
  const { actionLoading, setActionLoading } = useStore()

  const handleUpdateStatus = async () => {
    setActionLoading(true)
    try {
      const documentRef = doc(db, 'payments', item.uid)
      const newData = {
        statusCode: getStatusCode(status),
        status: status,
        note: note,
        biayaTambahan: biayaTambahan,
        linkGoogleDrive: linkGoogleDrive,
      }

      await updateDoc(documentRef, newData)
      console.log('Document updated successfully!')
      handleNotify()
      setActionLoading(false)
    } catch (error) {
      console.error('Error updating document:', error)
      setActionLoading(false)
    }
  }

  const handleChange = (value) => {
    setStatus(value)
  }

  const handleNotify = () => {
    const userNotificationsRef = dbRef(
      database,
      `notifications/userNotifications/${item.userId}`
    )

    // Generate a unique ID for the notification
    const newNotificationRef = push(userNotificationsRef)

    // Set the data for the notification
    set(newNotificationRef, {
      orderId: item.uid,
      title: status,
      message: 'Silakan cek',
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
    <>
      <div
        onClick={open}
        className='bg-primary w-32 h-8 text-xs text-white rounded-md flex justify-center items-center hover:cursor-pointer m-auto'>
        Update Status
      </div>
      <Modal.Root
        centered
        // className='relative z-[100]'
        opened={opened}
        onClose={close}>
        <Modal.Overlay />
        <Modal.Content className='rounded-3xl overflow-visible'>
          <Modal.Header className='rounded-3xl'>
            <Modal.Title className='font-bold text-3xl'>
              Status Pembayaran
            </Modal.Title>
            <Modal.CloseButton
              iconSize='28px'
              size='28px'
            />
          </Modal.Header>
          <Modal.Body>
            <div className='flex flex-col gap-4'>
              <Select
                data={dataStatus}
                radius='md'
                value={status}
                itemComponent={SelectStatus}
                onChange={handleChange}
                maxDropdownHeight={400}
                rightSection={<BsChevronDown size='1rem' />}
                rightSectionWidth={30}
                styles={dropdownStyle}
                transitionProps={{
                  transition: 'pop-top-left',
                  duration: 80,
                  timingFunction: 'ease',
                }}
              />
              {getStatusCode(status) === 4 && (
                <>
                  <Input
                    placeholder='Note'
                    value={note}
                    onChange={(v) => setNote(v.currentTarget.value)}
                  />
                  <Input
                    placeholder='Biaya Tambahan'
                    type='number'
                    value={biayaTambahan}
                    onChange={(v) => setBiayaTambahan(v.currentTarget.value)}
                  />
                </>
              )}
              {getStatusCode(status) === 6 && (
                <Input
                  placeholder='Link Google Drive'
                  value={linkGoogleDrive}
                  onChange={(v) => setLinkGoogleDrive(v.currentTarget.value)}
                />
              )}
            </div>
            <div className='my-4 w-full border border-neutral-200' />
            <div className='flex justify-around'>
              <button
                onClick={close}
                className='w-44 h-14 rounded-xl bg-neutral-300 text-white'>
                Batal
              </button>
              <button
                onClick={handleUpdateStatus}
                className='w-44 h-14 rounded-xl bg-primary text-white'>
                Simpan
              </button>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

const dropdownStyle = () => ({
  item: {
    // backgroundColor: ,
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
    height: '66px',
  },
})
