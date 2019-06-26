# PN532 I2C

## Micro:bit NFC Sensor expansion board.

## Table of Contents

* [URL](#url)
* [Summary](#summary)
* [Blocks](#blocks)
* [License](#license)

## URL
project URL: ```https://github.com/DFRobot/pxt-NFCI2C```

## Summary
NFC Sensor expansion board provides some Micro:bit blocks for reading and interpreting PN532 NFC RFID Module over I2C. These blocks make it easy to operate or acquiring imformation from the card via NFC sensors.Near field communication (NFC) is a set of standards for smart phones and similar devices to establish radio communicationwith each other by touching them together or bringing them into close proximity, usually no more than a few centimeter.

## Blocks
### 1.checkCard
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/checkCard.png)<br>
Whether a card is detected by NFC.

### 2.checkUid
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/checkUid.png)<br>
Whether UID data of card is detected.

### 3.getUid
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/getUid.png)<br>
Read NFC sensor UID data.

### 4.readDataBlock
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/readDataBlock.png)<br>
Read all data on NFC data block.

### 5.readDataNByte
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/readDataNBytes.png)<br>
Read NFC data specifying N bytes.

### 6.readDataByte
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/readDataByte.png)<br>
Read NFC data specifying one byte.

### 7.writeData
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/readDataNBytes.png)<br>
Write data to the first few bytes of the NFC data block

### 8.blockList
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/blockList.png)<br>

### 9.nfcDataList
![image](https://github.com/DFRobot/pxt-NFCI2C/blob/master/image/nfcDataList.png)<br>

## Example
get code: ```https://github.com/DFRobot/pxt-NFCI2C/blob/master/test.ts```

## License

MIT


