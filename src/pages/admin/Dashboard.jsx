import { Loader, LoadingOverlay } from '@mantine/core'
import { Table } from 'antd'
import {
    collection,
    getCountFromServer,
    getDocs,
    orderBy,
    query,
    where
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
  
  export const Dashboard = () => {
    const [payments, setPayments] = useState([])
    const [pending, setPending] = useState(false)
    const [count1, setCount1] = useState(0)
    const [count2, setCount2] = useState(0)
    const [count3, setCount3] = useState(0)
  
    const paymentsRef = collection(db, 'payments')
    const paymentsQuery = query(paymentsRef, orderBy('timestamp', 'desc'))
  
    const getCountAll = async () => {
        const totalKtpQuery = query(paymentsRef, where("jenisSurat", "==", "KTP"));
        const totalKkQuery = query(paymentsRef, where("jenisSurat", "==", "KK"));
        const totalNaQuery = query(paymentsRef, where("jenisSurat", "==", "NA"));
        const snapshotKtp = await getCountFromServer(totalKtpQuery);
        const snapshotKk = await getCountFromServer(totalKkQuery);
        const snapshotNa = await getCountFromServer(totalNaQuery);
        setCount1(snapshotKtp.data().count);
        setCount2(snapshotKk.data().count);
        setCount3(snapshotNa.data().count);
      };

  
    useEffect(() => {
      getCountAll()
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
            Dashboard Admin
          </div>
          <div className='border w-full border-black'></div>
<div className='flex flex-wrap gap-10'>
    <div className='w-60 h-60 bg-red-400'></div>
    <div className='w-60 h-60 bg-red-400'></div>
    <div className='w-60 h-60 bg-red-400'></div>
</div>
        
        </div>
      </>
    )
  }
  