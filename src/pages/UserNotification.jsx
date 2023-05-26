import React, { useEffect, useState } from 'react'
// @ts-ignore
import Orca from '../assets/logo-orca-small.svg'
import { Link } from 'react-router-dom'
import {
  onValue,
  push,
  set,
  ref as dbRef,
  limitToLast,
} from 'firebase/database'
import { database, auth } from '../config/firebase'
import { ScrollArea } from '@mantine/core'

export const UserNotification = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = () => {
    const userId = auth.currentUser.uid
    const userNotificationsRef = dbRef(
      database,
      `notifications/userNotifications/${userId}`
    )
    // const limitedUserNotificationsRef = limitToLast(5);
    let counter = 0

    onValue(
      userNotificationsRef,
      (snapshot) => {
        const notifications = snapshot.val()
        if (notifications) {
          const notificationIds = Object.keys(notifications)
          const userNotifications = notificationIds.reduce(
            (acc, notificationId) => {
              if (counter >= 5) return acc
              counter++
              return [
                ...acc,
                { id: notificationId, ...notifications[notificationId] },
              ]
            },
            []
          )
          setNotifications(userNotifications)
          console.log('User Notifications:', userNotifications)
        } else {
          console.log('No notifications found for the user.')
        }
      },
      (error) => {
        console.error('Error retrieving notifications:', error)
      }
    )
  }

  return (
    <>
      <ScrollArea h='85vh'>
        <div className='container flex flex-col w-full lg:max-w-5xl'>
          {notifications.map((item, id) => (
            <div
              key={id}
              className='flex border-black border'>
              <img
                src={Orca}
                alt=''
                className='p-6'
              />
              <div className='flex flex-col text-left gap-6 p-6'>
                <h2 className='text-2xl font-bold'>
                  Hai {auth.currentUser?.displayName}, {item.title}
                </h2>
                <p className='text-xl font-medium'>{item.message}</p>
                <div className='flex gap-4'>
                  <Link
                    to={'/profile/pesanan'}
                    className='flex justify-center items-center text-white text-sm w-48 h-7 bg-primary rounded-lg'>
                    Cek Status Pembayaran
                  </Link>
                  <Link
                    to={'/'}
                    className='flex justify-center items-center text-white text-sm w-48 h-7 bg-primary rounded-lg'>
                    Link Google Drive
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
