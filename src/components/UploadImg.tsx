import React, { useEffect, useState } from 'react';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { baseURL } from '@/config';

// 图片转base64方法
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
};

interface UploadImgProps {
    form: FormInstance<any>
}

const UploadImg: React.FC<UploadImgProps> = ({form}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            console.log(info);
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
                form.setFieldValue('photo', info.file.response.filename)
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );
        useEffect(()=>{
            // 在编辑状态中拿到图片地址，显示图片
            let photoUrl = form.getFieldValue('photo')
            if(photoUrl){
                setImageUrl(`${baseURL}headSculpture/${photoUrl}`)
            }
        }, [form.getFieldValue('photo')])
    return (
        <>
            <Upload
                name="photo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`${baseURL}reactAdmin/getUploadImg`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    );
}

export default UploadImg;