import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get('window');

const isSmall = width <= 375 && !DeviceInfo.hasNotch();

const guideLineBaseWidth = () => {
    if (isSmall) {
        return 330;
    }
    return 350;
};
const guideLineBaseHeight = () => {
    if (isSmall) {
        return 550;
    } else if (width > 375) {
        return 620;
    }
    return 680;
};
const guideLineBaseFonts = () => {
    if (width > 410) {
        return 430;
    }
    return 400;
};

export const horizontalScale = (size: any) => (width / guideLineBaseWidth()) * size;

export const verticalScale = (size: any) => (height / guideLineBaseHeight()) * size;

export const fontSizeScale = (size: any) => Math.round(width / guideLineBaseFonts()) * size;

export const sizeScale = (size: any) => Math.round(width / guideLineBaseFonts()) * size;



export const getFontFamily = (baseFont = 'Inter', weight: any) => {
    switch (weight) {
        case 100:
            return `${baseFont}-thing`;
        case 200:
            return `${baseFont}-ExtraLight`;
        case 300:
            return `${baseFont}-Light`;
        case 'normal':
        case 400:
            return `${baseFont}-Regular`;
        case 500:
            return `${baseFont}-Medium`;
        case 600:
            return `${baseFont}-SemiBold`;
        case 'bold':
        case 700:
            return `${baseFont}-Bold`;
        case 800:
            return `${baseFont}-ExtraBold`;
        case 900:
            return `${baseFont}-Black`;
        default:
            return `${baseFont}-Regular`;
    }
};
export const formatRupiah = (angka: number) => {
    if (angka) {
        var number_string = angka.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            let separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
    } else {
        rupiah = '';
    }

    return rupiah;
};

export const mapperLocationSearch = (data: any) => {
    const tempX: any = [];

    data.features.map((item: any, index: any) => {
        const newItem: any = {};
        newItem.id = item.id;
        newItem.title = item.text;
        newItem.address = item.place_name;
        tempX.push(newItem);
    });

    return tempX;
};

export const sleep = (ms: number) =>
    new Promise((resolve: any) => setTimeout(resolve, ms));

export const formatBase64 = (data: string) => {
    return `data:image/jpg;base64,${data}`;
};

export function formatDateToDdMmYyyy(date: Date) {
    const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (months are 0-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`;
}

