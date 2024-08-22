import { CameraView, useCameraPermissions } from "expo-camera"
import { SwitchCamera, X, Zap, ZapOff } from "lucide-react-native"
import { useState, useRef } from "react"
import { TouchableOpacity, View } from "react-native"

const CustomCamera = ({ onClose, facingOption }) => {

    const [torch, setTorch] = useState(false)
    const [facing, setFacing] = useState(facingOption)
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
        console.log(picture.uri)
    }

    return (
        <CameraView 
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            enableTorch={ torch }
            facing={ facing }
            ref={ camera }
        >
            <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, padding: 20 }} onPress={() => onClose()}>
                <X color='white' size={ 32 } />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', left: 0, top: 0, padding: 20 }} onPress={() => handleTorch()}>
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
    )
}

export default CustomCamera