// Add your code here
/**
 * demo1：Whether a card is detected by NFC.
 * If the NFC module detects a card, a check is displayed, 
 * otherwise the display fork.
 */
basic.forever(function () {
    if (NFC.checkCard()) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})

/**
 * demo2：Whether UID data of card is detected.
 * If the NFC module detects a specific Uid, a check is displayed, 
 * otherwise the display fork.
 */
basic.forever(function () {
    if (NFC.checkUid("39324fa2")) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})

/**
 * demo3：Read NFC sensor UID data.
 * Serial port prints the detected card id
 */
basic.forever(function () {
    serial.writeLine(NFC.getUid())
    basic.pause(2000)
})

/**
 * demo4：Read all data on NFC data block.
 * Serial port prints all data of a data block of NFC.
 */
basic.forever(function () {
    serial.writeLine(NFC.readDataBlock(NFC.blockList(DataBlockList.block_1)))
    basic.pause(2000)
})

/**
 * demo5：Read and write data to NFC data blocks.
 */
NFC.writeData(NFC.blockList(DataBlockList.block_1), NFC.nfcDataList(byteNumList.data_1), 11)
NFC.writeData(NFC.blockList(DataBlockList.block_1), NFC.nfcDataList(byteNumList.data_2), 99)
NFC.writeData(NFC.blockList(DataBlockList.block_1), NFC.nfcDataList(byteNumList.data_3), 25)
basic.forever(function () {
    serial.writeLine(NFC.readDataNByte(NFC.blockList(1), NFC.nfcDataList(byteNumList.data_1), 3))
    basic.pause(2000)
})
