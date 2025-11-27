import {  StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        backgroundColor:themas.colors.bgScreen,
        flex:1,
    },
    containerLogo:{
        flex:2,
        backgroundColor:themas.colors.bgScreen,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerForm:{
        flex:1,
        backgroundColor:themas.colors.primary,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart:'5%',
        paddingEnd:'5%',
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        marginTop:28,
        marginBottom:12,

    },
    text:{
        color:themas.colors.bgScreen,
        fontSize:15,
    },
    button:{
        position:'absolute',
        backgroundColor:themas.colors.bgScreen,
        borderRadius:50,
        paddingVertical:8,
        width:'60%',
        alignSelf:'center',
        bottom:'15%',
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
    }
})