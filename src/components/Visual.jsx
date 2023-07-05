//RESPONSIVE
import { View,StyleSheet,Text } from "react-native"

export function Visual({data:{humedadColor,temperaturaColor,CO2Color,humedad,CO2,temperatura}}){
    return(
        <View style={styles.infobolsaC}>
                                <View style={styles.infobolsa}>
                                    <View style={styles.valor}><Text style={[styles.valorN,{color:temperaturaColor}]}>{temperatura}°</Text></View>
                                    <View style={[styles.color,{backgroundColor:temperaturaColor}]}></View>
                                </View>
                                <View style={styles.infobolsa}>
                                    <View style={styles.valor}><Text style={[styles.valorN,{color:CO2Color}]}>{CO2}%</Text></View>
                                    <View style={[styles.color,{backgroundColor:CO2Color}]}></View>
                                </View>
                                <View style={styles.infobolsa}>
                                    <View style={styles.valor}><Text style={[styles.valorN,{color:humedadColor}]}>{humedad}%</Text></View>
                                    <View style={[styles.color,{backgroundColor:humedadColor}]}></View>
                                </View>
                            </View>
    )
}
const styles=StyleSheet.create({
    
infobolsaC:{
    flex:0.8,
    flexDirection:'row',
    maxHeight:'20%',
    backgroundColor:'#fff',
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    marginTop:10
},
infobolsa:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
},
valor:{
    flex:0.9,
    justifyContent:'center',
    alignItems:'center',
},
color:{
    width:'100%',
    flex:0.1,
    backgroundColor:'red'
},
valorN:{
    fontSize:40
},
})