import { Group, Modal, Select, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { doc, updateDoc } from 'firebase/firestore'
import React, { forwardRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { auth, database, db } from '../../config/firebase'
import { useStore } from '../../global/store'
import { push, set, ref as dbRef } from 'firebase/database'

const dataStatus = [
  'Pembayaran DP',
  'Verifikasi DP Diterima',
  'Verifikasi DP Ditolak',
  'Pembayaran Pelunasan',
  'Verifikasi Pelunasan Diterima',
  'Verifikasi Pelunasan Ditolak',
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

export const UpdateStatusModal = ({ item }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [status, setStatus] = useState(item.status)
  const { actionLoading, setActionLoading } = useStore()

  const handleUpdateStatus = async () => {
    setActionLoading(true)
    try {
      const documentRef = doc(db, 'payments', item.uid)
      const newData = {
        status: status,
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
        className='bg-[#68B984] w-32 h-8 text-xs text-white rounded-md flex justify-center items-center hover:cursor-pointer m-auto'>
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
            <Select
              data={dataStatus}
              radius='md'
              value={status}
              itemComponent={SelectStatus}
              onChange={handleChange}
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
            />
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
    height: '66px',
  },
}
