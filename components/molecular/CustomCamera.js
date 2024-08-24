import { CameraView, useCameraPermissions } from "expo-camera"
import { SwitchCamera, X, Zap, ZapOff, Check } from "lucide-react-native"
import { useState, useRef } from "react"
import { TouchableOpacity, View, Image } from "react-native"

const CustomCamera = ({ closeCamera, facingOption, savePictureURI }) => {

    const [torch, setTorch] = useState(false)
    const [facing, setFacing] = useState(facingOption)
    const [currentPicture, setCurrentPicture] = useState('')
    const [permission, requestPermission] = useCameraPermissions()
    const camera = useRef(null)
    
    if(!permission){
        return (
            <View />
        )
    }
    if(!permission.granted){
        requestPermission()
        if(permission.status === 'denied') return
    }
    
    const toogleFacing = () => setFacing(e => (e === 'back' ? 'front' : 'back'))
    const handleTorch = () => setTorch(!torch)
    const takePicture = async() => {
        const picture = await camera.current.takePictureAsync({quality: .5})
        setCurrentPicture(picture.uri)
    }
    const savePicture = async () => {
        await savePictureURI(currentPicture)
        closeCamera()
    }

    return (
        <>
        {!currentPicture
            ? <CameraView 
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                enableTorch={ torch }
                facing={ facing }
                ref={ camera }
            >
                <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, padding: 20 }} onPress={() => closeCamera()}>
                    <X color='white' size={ 32 } />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, padding: 20}} onPress={() => handleTorch()}>
                    {torch
                        ? <ZapOff color='white' size={ 32 } />
                        : <Zap color='white' size={ 32 } />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', left: 60, top: 0, padding: 20 }} onPress={() => toogleFacing()}>
                    <SwitchCamera color='white' size={ 32 } />
                </TouchableOpacity>
                <View style={{ width: '100%', alignItems:'center', position: 'absolute', bottom: 50 }}>
                    <TouchableOpacity style={{ width: 64, height: 64, padding: 5, borderWidth: 3, borderColor: 'white', borderRadius: 64 }} onPress={() => takePicture()}>
                        <View style={{ backgroundColor:'#FFFFFF99', width: '100%', height: '100%', borderRadius: 64 }}></View>
                    </TouchableOpacity>
                </View>
            </CameraView>
            : <View style={{ backgroundColor: 'black', position: 'absolute', height: '100%', width: '100%' }}>
                <Image source={{ uri: currentPicture }} style={{ resizeMode: 'cover', height: '100%', width: '100%' }} />
                <View style={{ width: '100%', justifyContent:'center', alignItems: 'center', position: 'absolute', bottom: 50, flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity style={{ width: 48, height: 48, padding: 5, borderWidth: 3, borderColor: 'white', borderRadius: 48 }} onPress={() => setCurrentPicture('')}>
                        <View style={{ backgroundColor:'#FEC2A999', width: '100%', height: '100%', borderRadius: 48, justifyContent: 'center', alignItems: 'center' }}>
                            <X size={ 24 } color='white' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 64, height: 64, padding: 5, borderWidth: 3, borderColor: 'white', borderRadius: 64 }} onPress={() => savePicture()}>
                        <View style={{ backgroundColor:'#46676099', width: '100%', height: '100%', borderRadius: 64, justifyContent: 'center', alignItems: 'center' }}>
                            <Check size={ 32 } color='white' />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        }
        </>
    )
}

export default CustomCamera