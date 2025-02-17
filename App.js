import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,  
    TouchableOpacity,
    Picker,    
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from '../dsm/services/apiEstados';
import apiPais from '../dsm/services/apipaises'
function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                    uri: "data:image/jpeg;base64,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",
                }} />
            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Estados')}
            >
                <Text style={styles.botaoLogin}> Pesquisar por estado Brasileiro </Text>{" "}
            </TouchableOpacity>{" "}
            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('País')}
            >
                <Text style={styles.botaoLogin}> Pesquisar por País </Text>{" "}
            </TouchableOpacity>{" "}
            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('Status')}
            >
                <Text style={styles.botaoLogin}> Status da Api </Text>{" "}
            </TouchableOpacity>{" "}
        </View>
    );
}
function EstadoScreen({ navigation }) {

    const [selectedValue, setSelectedValue] = useState("");
    const [selectedEstado, setSelectedEstado] = useState({});
   
    const getEstado = async () => {
        const response = await api.get(`${selectedValue}`);
        setSelectedEstado(response.data)
            console.log(selectedEstado)
            console.log(setSelectedEstado)
            estado: response.data
        };
    return (
        <View style={styles.container}>
            
           
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item color='white' value={'Toronto'} label="selecione um estado" value="0" />
                    <Picker.Item label="Acre" value="ac" />
                    <Picker.Item label="Alagoas" value="al" />
                    <Picker.Item label="Amapá" value="ap" />
                    <Picker.Item label="Bahia" value="ba" />
                    <Picker.Item label="Ceará" value="ce" />
                    <Picker.Item label="Distrito Federal" value="df" />
                    <Picker.Item label="Espiríto Santo" value="es" />
                    <Picker.Item label="Goiás" value="go" />
                    <Picker.Item label="Maranhão" value="ma" />
                    <Picker.Item label="Mato Grosso" value="mt" />
                    <Picker.Item label="Mato Grosso do Sul" value="ms" />
                    <Picker.Item label="Minas Gerais" value="mg" />
                    <Picker.Item label="Pará" value="pa" />
                    <Picker.Item label="Paraíba" value="pb" />
                    <Picker.Item label="Paraná" value="pr" />
                    <Picker.Item label="Pernambuco" value="pe" />
                    <Picker.Item label="Piauí" value="pi" />
                    <Picker.Item label="Rio de Janeiro" value="rj" />
                    <Picker.Item label="Rio Grande do Norte" value="rn" />
                    <Picker.Item label="Rio Grande do Sul" value="rs" />
                    <Picker.Item label="Rondônia" value="ro" />
                    <Picker.Item label="Roraima" value="rr" />
                    <Picker.Item label="Santa Catarina" value="sc" />
                    <Picker.Item label="São Paulo" value="sp" />
                    <Picker.Item label="Sergipe" value="se" />
                    <Picker.Item label="Tocantins" value="to" />

                </Picker>
                
                <TouchableOpacity style={styles.botaoPesquisa}
                    onPress={getEstado}

                >
                    <Text style={styles.botaoLogin}>Pesquisar </Text>{" "}
                </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Estado: {selectedEstado.state} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Casos: {selectedEstado.cases} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Mortes: {selectedEstado.deaths} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Casos Suspeitos: {selectedEstado.suspects} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Casos Recusados: {selectedEstado.refuses} </Text>{" "}
            </TouchableOpacity>
        </View>
    );
}


function StatusScreen({ navigation }) {
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        fetch('https://covid19-brazil-api.vercel.app/api/status/v1', {
            method: 'GET'


        })
            .then(response => response.json())
            .then(data => {
                setSelectedStatus(data)
                setSelectedValue(data.aws)
            })


    }, [])

    console.log(selectedStatus)
    console.log(selectedValue)
    return (
        <View style={styles.container}>
                <TouchableOpacity
                    style={styles.botao2}
                    disabled
                >
                    <Text style={styles.botaoLogin}>Status: {selectedStatus.status} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Data : {selectedStatus.date} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Estado de Producao: {selectedStatus.environment} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Regiao da API: {selectedValue.region} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Versao: {selectedValue.function_version} </Text>{" "}
            </TouchableOpacity>
        </View>
    );
}
function PaisScreen({ navigation }) {
    const [selectedValue, setSelectedValue] = useState({});
    const [selectedpais, setSelectedpais] = useState({});
    const getEstado = async () => {
        const response = await apiPais.get(`${selectedValue}`);
        setSelectedpais(response.data.data)
        console.log(selectedpais)
        console.log(setSelectedpais)
        console.log(selectedValue)
    };
    return (
        <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item color='white' value={'Toronto'} label="selecione um Pais" value="0" />
                    <Picker.Item label="Basil" value="brazil" />
                    <Picker.Item label="Canadá" value="canada" />
                    <Picker.Item label="França" value="france" />
                    <Picker.Item label="itália" value="italy" />
                    <Picker.Item label="Estados Unidos" value="us" />
                </Picker>
                <TouchableOpacity style={styles.botaoPesquisa}
                    onPress={getEstado}

                >
                    <Text style={styles.botaoLogin}>Pesquisar </Text>{" "}
                </TouchableOpacity>
            <TouchableOpacity
                style={styles.botao2}
                disabled
            >
                <Text style={styles.botaoLogin}>Estado: {selectedpais.country} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Casos: {selectedpais.confirmed} </Text>{" "}
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Mortes: {selectedpais.deaths} </Text>{" "}
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.botao}
                disabled
            >
                <Text style={styles.botaoLogin}>Data : {selectedpais.updated_at} </Text>{" "}
            </TouchableOpacity>
            </View>
    );
}
const Stack = createStackNavigator();

function MyStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Início" component={HomeScreen} />
            <Stack.Screen name="Estados" component={EstadoScreen} />
            <Stack.Screen name="País" component={PaisScreen} />
            <Stack.Screen name="Status" component={StatusScreen} />
            </Stack.Navigator>
      
    );
}
export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
        
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50",
    },
    logo: {
        resizeMode: "contain",
        width: 150,
        height: 150,
        marginBottom: 70,
        borderRadius: 150,
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        borderRadius: 3,
    },
    botao: {
        width: 300,
        height: 42,
        backgroundColor: "#3498db",
        marginTop: 10,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    botaocadastro: {
        width: 300,
        height: 42,
        marginTop: 10,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    botaoLogin: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    picker: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
        width: 300,
        height: 42,
        fontFamily: 'Arial',
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        
    },
    botaoPesquisa: {
        width: 100,
        height: 42,
        marginTop: 10,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#CB3535",
        marginLeft: 200,
        borderRadius: 4,
       
    },
    botao2: {
        width: 300,
        height: 42,
        backgroundColor: "#3498db",
        marginTop: 50,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
});