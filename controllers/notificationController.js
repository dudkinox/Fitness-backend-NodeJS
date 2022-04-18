'use strict'

const firebase = require('../db')
const Account = require('../models/main')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const firestore = firebase.firestore()
var md5 = require('md5')

dotenv.config()

function convertTZ (date, tzString) {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('th-TH', {
      timeZone: tzString
    })
  )
}

const getNotification = async (req, res, next) => {
  try {
    const id = req.params.id
    const dataoldarray = []
    const datanewarray = []
    const notification = await firestore
      .collection('subscribes')
      .where('iduser', '==', id)
    const data = await notification.get()
    if (data.docs[0].exists) {
      data.forEach(doc => {
        const result = {
          id: doc.id,
          idsubclass: doc.data().idsubclass,
          time: doc.data().time,
          status: doc.data().status
        }
        dataoldarray.push(result)
      })

      for (var i = 0; i < dataoldarray.length; i++) {
        const data = await firestore
          .collection('subclass')
          .doc(dataoldarray[i].idsubclass)
        const newdata = await data.get()
        if (dataoldarray[i].status !== 'ยกเลิก') {
          const time = dataoldarray[i].time
          const date = new Date()
          var Timezone = convertTZ(date, 'Asia/Bangkok')
          const formatDatestart = time.startAt.split(' ')
          const formatDateend = time.endAt.split(' ')
          const dateEnd = formatDateend[0]
          const timeEnd = formatDateend[1]
          const dateStart = formatDatestart[0]
          const timeStart = formatDatestart[1]
          const timeNow = Timezone.getHours()
          if (date.toLocaleDateString('en-US') === dateStart) {
            const hour = timeStart.split(':')
            const sumTime = hour[0] - timeNow
            if (sumTime === 1) {
              const result = {
                id: dataoldarray[i].id,
                classname: newdata.data().classname,
                time: dataoldarray[i].time,
                status: 'คลาสของคุณกำลังจะเริ่มในอีก 1 ชั่วโมง.'
              }
              datanewarray.push(result)
            }
          } else if (date.toLocaleDateString('en-US') === dateEnd) {
            console.log(dateEnd)
            const hour = timeEnd.split(':')
            const sumTime = hour[0] - timeNow
            if (sumTime <= 0) {
              const result = {
                id: dataoldarray[i].id,
                classname: newdata.data().classname,
                time: dataoldarray[i].time,
                status: 'คลาสของคุณสิ้นสุดแล้ว'
              }
              datanewarray.push(result)
            }
          }
        }
      }
      console.log(datanewarray)
      if (datanewarray !== []) {
        return res.status(200).send(datanewarray)
      }
    }
    return res.status(404).send([])
  } catch (error) {
    return res.status(404).send(error.message)
  }
}

module.exports = {
  getNotification
}
