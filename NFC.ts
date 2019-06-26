enum DataBlockList {
    //% block="1"
    block_1 = 1,
    //% block="2"
    block_2 = 2,
    //% block="4"
    block_4 = 4,
    //% block="5"
    block_5 = 5,
    //% block="6"
    block_6 = 6,
    //% block="8"
    block_8 = 8,
    //% block="9"
    block_9 = 9,
    //% block="10"
    block_10 = 10,
    //% block="12"
    block_12 = 12,
    //% block="13"
    block_13 = 13,
    //% block="14"
    block_14 = 14,
    //% block="16"
    block_16 = 16,
    //% block="17"
    block_17 = 17,
    //% block="18"
    block_18 = 18,
    //% block="20"
    block_20 = 20,
    //% block="21"
    block_21 = 21,
    //% block="22"
    block_22 = 22,
    //% block="24"
    block_24 = 24,
    //% block="25"
    block_25 = 25,
    //% block="26"
    block_26 = 26,
    //% block="28"
    block_28 = 28,
    //% block="29"
    block_29 = 29,
    //% block="30"
    block_30 = 30,
    //% block="32"
    block_32 = 32,
    //% block="33"
    block_33 = 33,
    //% block="34"
    block_34 = 34,
    //% block="36"
    block_36 = 36,
    //% block="37"
    block_37 = 37,
    //% block="38"
    block_38 = 38,
    //% block="40"
    block_40 = 40,
    //% block="41"
    block_41 = 41,
    //% block="42"
    block_42 = 42,
    //% block="44"
    block_44 = 44,
    //% block="45"
    block_45 = 45,
    //% block="46"
    block_46 = 46,
    //% block="48"
    block_48 = 48,
    //% block="49"
    block_49 = 49,
    //% block="50"
    block_50 = 50,
    //% block="52"
    block_52 = 52,
    //% block="53"
    block_53 = 53,
    //% block="54"
    block_54 = 54,
    //% block="56"
    block_56 = 56,
    //% block="57"
    block_57 = 57,
    //% block="58"
    block_58 = 58,
    //% block="60"
    block_60 = 60,
    //% block="61"
    block_61 = 61,
    //% block="62"
    block_62 = 62
}

enum byteNumList {
    //% block="1"
    data_1 = 1,
    //% block="2"
    data_2 = 2,
    //% block="3"
    data_3 = 3,
    //% block="4"
    data_4 = 4,
    //% block="5"
    data_5 = 5,
    //% block="6"
    data_6 = 6,
    //% block="7"
    data_7 = 7,
    //% block="8"
    data_8 = 8,
    //% block="9"
    data_9 = 9,
    //% block="10"
    data_10 = 10,
    //% block="11"
    data_11 = 11,
    //% block="12"
    data_12 = 12,
    //% block="13"
    data_13 = 13,
    //% block="14"
    data_14 = 14,
    //% block="15"
    data_15 = 15,
    //% block="16"
    data_16 = 16
}

//% color="#AA278D" height=100 icon="\uf062" block="NFC"
namespace NFC {
    let NFC_I2C_ADDR = (0x48 >> 1);
    let recvBuf = pins.createBuffer(32);
    let recvAck = pins.createBuffer(8);
    let ackBuf = pins.createBuffer(6);
    let uId = pins.createBuffer(4);
    let passwdBuf = pins.createBuffer(6);
    let blockData = pins.createBuffer(16);
    let NFC_ENABLE = 0;
    ackBuf[0] = 0x00;
    ackBuf[1] = 0x00;
    ackBuf[2] = 0xFF;
    ackBuf[3] = 0x00;
    ackBuf[4] = 0xFF;
    ackBuf[5] = 0x00;
    passwdBuf[0] = 0xFF;
    passwdBuf[1] = 0xFF;
    passwdBuf[2] = 0xFF;
    passwdBuf[3] = 0xFF;
    passwdBuf[4] = 0xFF;
    passwdBuf[5] = 0xFF;


    function writeAndReadBuf(buf: Buffer, len: number) {
        pins.i2cWriteBuffer(NFC_I2C_ADDR, buf);
        basic.pause(100);
        recvAck = pins.i2cReadBuffer(NFC_I2C_ADDR, 8);
        basic.pause(100);
        recvBuf = pins.i2cReadBuffer(NFC_I2C_ADDR, len - 4);
    }

    function wakeup() {
        basic.pause(100);
        let i = 0;
        let buf: number[] = [];
        buf = [0x00, 0x00, 0xFF, 0x05, 0xFB, 0xD4, 0x14, 0x01, 0x14, 0x01, 0x02, 0x00];
        let cmdWake = pins.createBufferFromArray(buf);
        writeAndReadBuf(cmdWake, 14);
        for (i = 0; i < ackBuf.length; i++) {
            if (recvAck[1 + i] != ackBuf[i]) {
                break;
            }
        }
        if ((i != ackBuf.length) || (recvBuf[6] != 0xD5) || (recvBuf[7] != 0x15) || (!checkDcs(14 - 4))) {
            NFC_ENABLE = 0;
        } else {
            NFC_ENABLE = 1;
        }
        basic.pause(100);
    }

    function checkDcs(len: number): boolean {
        let sum = 0, dcs = 0;
        for (let i = 1; i < len - 2; i++) {
            if ((i === 4) || (i === 5)) {
                continue;
            }
            sum += recvBuf[i];
        }
        dcs = 0xFF - (sum & 0xFF);
        if (dcs != recvBuf[len - 2]) {
            return false;
        }
        return true;
    }

    function numTostr(x: number): string {
        let ret = "";
        if (x < 0x0A) {
            ret += x.toString();
        } else {
            switch (x) {
                case 0x0A:
                    ret += "a";
                    break;
                case 0x0A:
                    ret += "a";
                    break;
                case 0x0B:
                    ret += "b";
                    break;
                case 0x0C:
                    ret += "c";
                    break;
                case 0x0D:
                    ret += "d";
                    break;
                case 0x0E:
                    ret += "e";
                    break;
                case 0x0F:
                    ret += "f";
                    break;
                default:
                    break;
            }
        }
        return ret;
    }
    function numberToString(x: number): string {
        let ret = "";
        let temp = ((x & 0xF0) >> 4);
        ret += numTostr(temp);
        temp = x & 0x0F;
        ret += numTostr(temp);
        return ret;
    }

    function passwdCheck(blockN: number, id: Buffer, st: Buffer): boolean {
        let buf: number[] = [];
        buf = [0x00, 0x00, 0xFF, 0x0F, 0xF1, 0xD4, 0x40, 0x01, 0x60, 0x07, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xD1, 0xAA, 0x40, 0xEA, 0xC2, 0x00];
        let cmdPassWord = pins.createBufferFromArray(buf);
        let sum = 0, count = 0;
        cmdPassWord[9] = blockN;
        for (let i = 10; i < 16; i++)
            cmdPassWord[i] = st[i - 10];
        for (let i = 16; i < 20; i++)
            cmdPassWord[i] = id[i - 16];
        for (let i = 0; i < 20; i++) {
            if (i === 3 || i === 4) {
                continue;
            }
            sum += cmdPassWord[i];
        }
        cmdPassWord[20] = 0xff - (sum & 0xff)
        writeAndReadBuf(cmdPassWord, 15);
        for (let i = 0; i < 4; i++) {
            if (recvAck[1 + i] != ackBuf[i]) {
                serial.writeLine("psd ack ERROR!");
                return false;
            }
        }
        if ((recvBuf[6] === 0xD5) && (recvBuf[7] === 0x41) && (recvBuf[8] === 0x00) && (checkDcs(15 - 4))) {
            return true;
        }
        return false;
    }

    function writeblock(blockN: number, data: Buffer): void {
        if (!passwdCheck(blockN, uId, passwdBuf))
            return;
        let cmdWrite: number[] = [0x00, 0x00, 0xff, 0x15, 0xEB, 0xD4, 0x40, 0x01, 0xA0,
            0x06, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
            0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0xCD,
            0x00];
        let sum = 0, count = 0;
        cmdWrite[9] = blockN;
        for (let i = 10; i < 26; i++)
            cmdWrite[i] = data[i - 10];
        for (let i = 0; i < 26; i++) {
            if ((i === 3) || (i === 4)) {
                continue;
            }
            sum += cmdWrite[i];
        }
        cmdWrite[26] = 0xff - (sum & 0xff);
        let tempbuf = pins.createBufferFromArray(cmdWrite)
        writeAndReadBuf(tempbuf, 16);
    }
    //% weight=2
    //% blockId=block_nfc_list block="%blockNum|data block"
    export function blockList(blockNum?: DataBlockList): number {
        return blockNum;
    }

    //% weight=1
    //% blockId=data_nfc_list block="%dataNum|byte"
    export function nfcDataList(dataNum?: byteNumList): number {
        return dataNum;
    }

    //% weight=9
    //% block="Detect Card"
    export function checkCard(): boolean {
        if (NFC_ENABLE === 0) {
            wakeup();
        }
        let buf: number[] = [];
        buf = [0x00, 0x00, 0xFF, 0x04, 0xFC, 0xD4, 0x4A, 0x01, 0x00, 0xE1, 0x00];
        let cmdUid = pins.createBufferFromArray(buf);
        writeAndReadBuf(cmdUid, 24);
        for (let i = 0; i < 4; i++) {
            if (recvAck[1 + i] != ackBuf[i]) {
                return false;
            }
        }
        if ((recvBuf[6] != 0xD5) || (!checkDcs(24 - 4))) {
            return false;
        }
        for (let i = 0; i < uId.length; i++) {
            uId[i] = recvBuf[14 + i];
        }
        if (uId[0] === uId[1] && uId[1] === uId[2] && uId[2] === uId[3] && uId[3] === 0xFF) {
            return false;
        }
        return true;
    }

    //% weight=8
    //% block="check nfc id|%id"
    //% id.defl="39324fa2"
    export function checkUid(id: string): boolean {
        if (NFC_ENABLE === 0) {
            wakeup();
        }
        if (getUid() === id) {
            return true;
        }
        return false;
    }

    //% weight=7
    //% block="get nfc id"
    export function getUid(): string {
        if (NFC_ENABLE === 0) {
            wakeup();
        }
        if (!checkCard()) {
            return "No NFC Card!";
        }
        let nfcUid = "";
        for (let i = 0; i < 4; i++) {
            nfcUid += numberToString(uId[i]);
        }
        return nfcUid;
    }


    //% weight=6
    //% block="read nfc data block|%block=block_nfc_list"
    //% block.defl=1
    export function readDataBlock(block: number): string {
        if (NFC_ENABLE === 0) {
            wakeup();
        }
        if (checkCard() === false) {
            return "No NFC Card!";
        }
        if (!passwdCheck(block, uId, passwdBuf)) {
            return "passwd error!";
        }
        let cmdRead: number[] = []
        cmdRead = [0x00, 0x00, 0xff, 0x05, 0xfb, 0xD4, 0x40, 0x01, 0x30, 0x07, 0xB4, 0x00];
        let sum = 0, count = 0;
        cmdRead[9] = block;
        for (let i = 0; i < cmdRead.length - 2; i++) {
            if ((i === 3) || (i === 4)) {
                continue;
            }
            sum += cmdRead[i];
        }
        cmdRead[cmdRead.length - 2] = 0xff - sum & 0xff;
        let buf = pins.createBufferFromArray(cmdRead)
        writeAndReadBuf(buf, 31);
        for (let i = 0; i < 4; i++) {
            if (recvAck[1 + i] != ackBuf[i]) {
                return "ACK error!"
            }
        }
        let ret = "";
        if ((recvBuf[6] === 0xD5) && (recvBuf[7] === 0x41) && (recvBuf[8] === 0x00) && (checkDcs(31 - 4))) {
            let buf: number[] = [];
            for (let i = 0; i < 16; i++) {
                blockData[i] = recvBuf[i + 9];
                buf[i] = recvBuf[i + 9];
                ret += numberToString(buf[i]);
                ret += " ";
            }
            return ret;
        }
        return "read error!";
    }

    //% weight=5
    //% block="read nfc data one byte|%block=block_nfc_list|%byteN=data_nfc_list"
    //% block.defl=1
    //% blockN.defl=1 byteN.defl=1
    export function readDataByte(block: number, byteN: number): string {
        let ret = "";
        let str=readDataBlock(block);
        if(str.length < 14){
            return str;
        }
        ret = ret + (blockData[byteN - 1]).toString();
        return ret;
    }
    //% weight=4
    //% block="read nfc data bytes|%blockN=block_nfc_list|%index=data_nfc_list|%nByte"
    //% block.defl=1
    //% blockN.defl=1 byteN.defl=1
    //% nByte.min=1 nByte.max=16
    //% nByte.defl=1
    export function readDataNByte(blockN: number, index: number, nByte: number): string {
        if (index + nByte - 1 > 16) {
            nByte = 16 - index + 1;
        }
        if (nByte <1){
            nByte = 1;
        }
        let ret = "";
        let str = readDataBlock(blockN);
        if (str.length < 14) {
            return str;
        }
        for (let i = 0; i < nByte; i++) {
            ret += blockData[i + index - 1];
            ret += " ";
        }
        return ret;
    }

    //% weight=3
    //% blockId=write_nfc_data 
    //% data.min=0 data.max=255
    //% block="NFC sensor|%blockN=block_nfc_list|%index=data_nfc_list|write%data"
    export function writeData(blockN: number, index: number, data: number): void{
        if ((blockN > 63) || (blockN < 0)) {
            return ;
        }
        if (data > 255)
            data = 255;
        if (data < 0)
            data = 0;
        let str = readDataBlock(blockN);
        if(str.length < 14){
            serial.writeLine("No NFC card,write failed!");
            return;
        }
        blockData[index - 1] = data;
        writeblock(blockN, blockData);
        basic.pause(3);
    }
}