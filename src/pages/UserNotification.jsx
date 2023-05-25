import React, { useEffect, useState } from 'react'
// @ts-ignore
import Orca from '../assets/logo-orca-small.svg'
import { Link } from 'react-router-dom'
import { onValue, push, set, ref as dbRef } from 'firebase/database'
import { database, auth } from '../config/firebase'

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

    onValue(
      userNotificationsRef,
      (snapshot) => {
        const notifications = snapshot.val()
        console.log(
          '🚀 ~ file: UserNotification.jsx:23 ~ getNotifications ~ notifications:',
          notifications
        )
        if (notifications) {
          const notificationIds = Object.keys(notifications)
          console.log(
            '🚀 ~ file: UserNotification.jsx:26 ~ getNotifications ~ notificationIds:',
            notificationIds
          )
          const userNotifications = notificationIds.map((notificationId) => ({
            id: notificationId,
            ...notifications[notificationId],
          }))
          console.log(
            '🚀 ~ file: UserNotification.jsx:31 ~ userNotifications ~ userNotifications:',
            userNotifications
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
      <div className='container flex flex-col w-full lg:max-w-5xl'>
        {notifications.map((item) => (
          <div className='flex border-black border'>
            <img
              src={Orca}
              alt=''
              className='p-6'
            />
            <div className='flex flex-col text-left gap-6 p-6'>
              <h2 className='text-2xl font-bold'>
                Hai {auth.currentUser?.displayName}, {item.title}
              </h2>
              <p className='text-xl font-medium'>
                {item.message}
              </p>
              <div className='flex gap-4'>
                <Link
                  to={'/'}
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
    </>
  )
}
