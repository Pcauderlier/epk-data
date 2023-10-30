import { Page, Text, Image, Document, StyleSheet, View, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import React from "react"
import logo from "../img/LOGO_EPK.png"



export default function CreateInvoice({orders,eleve,course}){
    
    const style = StyleSheet.create({
        page : {
            marginLeft : 50,
                       
        },
        image : {
            height : 150,
            width : 150,
            position : 'absolute',
            top : 10,
            right : 70
        },
        p1 : {
            fontSize : 12,
            lineHeight : 1.8,
            position : 'absolute',
            top : 70
            
        },
        p2 :{
            position : 'absolute',
            right : 90,
            top : 170,
            fontSize : 12,
            lineHeight : 1.8,
        },
        p3 : {
            position : 'absolute',
            top : 230,
            left : 150,
            fontSize : 12,
            lineHeight : 1.8,

        },
        tableau : {
            border : '2px solid black',
            position : 'absolute',
            bottom : 150,
            left : 25,
            width : 440
        },
        ligne : {
            display : 'flex',
            flexDirection : 'row',
            borderBottom : '2px solid black',
            height : 50,
        },
        item : {
            
            borderRight : '2px solid black',
            width : 220,
            marginLeft : 20,
            fontSize : 14,
            lineHeight : 1.8,
            display : 'flex',
            textAlign : 'left',
            justifyContent : 'center'
        },
        p4 : {
            fontSize : 12,
            lineHeight : 1.8,
            position : 'absolute',
            bottom : 50
        }
    });   
    
    const Invoice = () => (
        <Document>
            <Page style={style.page}>
                <Image src={logo} style={style.image}/>                
                <View style={style.p1}>
                    <Text style={{color : 'red', fontSize : 16, lineHeight : 2, textDecoration : 'underline'}}>Ecole Professionnelle de Kinésiologie SRL</Text>
                    <Text>Rue Jérôme Noël, 19</Text>
                    <Text>1325 Chaumont Gistoux</Text>
                    <Text>Téléphone : 0475/30 58 82</Text>
                    <Text>Numéro TVA : BE 0764.541.825</Text>
                    <Text>IBAN  BE 49-7320-5818-2671</Text>
                </View>
                <View style={style.p2}>
                    <Text style={{textDecoration : 'underline', fontSize : 14}}>Facture n°EPK 23-{orders.order_id}</Text>
                    <Text>Date : {orders.date_created.split(' ')[0]}</Text>
                </View>
                <View style={style.p3}>
                    <Text style={{textDecoration : 'underline', fontSize : 14}}>Client :</Text>
                    <Text>{eleve.sociaty}</Text>
                    <Text>{eleve.TVA}</Text>
                    <Text>{orders.customer_name}</Text>
                    <Text>{eleve.adress.street}</Text>
                    <Text>{eleve.adress.city} , {eleve.adress.postcode}</Text>
                    
                </View>
                <View style={style.tableau}>
                    <View style={[style.ligne, {height : 100}]}>
                        <Text style={[style.item,{ width : 440, fontSize : 16}]}>{course.name}</Text>
                    </View>
                    <View style={style.ligne}>
                        <Text style={style.item}>Total TVAC</Text>
                        <Text style={style.item}>{orders.price.TVAC} €</Text>
                    </View>
                    <View style={style.ligne}>
                        <Text style={style.item}>Total HTVA </Text>
                        <Text style={style.item}>{orders.price.HTVA} €</Text>
                    </View>
                    <View style={style.ligne}>
                        <Text style={style.item}>Total TVA </Text>
                        <Text style={style.item}>{orders.price.TVA}</Text>
                    </View>
                </View>
                <View style={style.p4}>
                    <Text>Facture acquittée</Text>
                    <Text>Thienpont Caroline</Text>
                    <Text>Administratrice EPK</Text>
                </View>
                
            </Page>
       </Document>
    );
    
    return (
        <div>
            <div>
                <PDFViewer
                width={467}
                height={700}
                >
                    <Invoice/>
                </PDFViewer>
            </div>
            <div>
                <PDFDownloadLink
                document={<Invoice/>}
                fileName={`EPK23-${orders.orders_id}`}>
                    <button className="button">Télécharger la Facture</button>
                </PDFDownloadLink>
            </div>
        </div>   
   )
}