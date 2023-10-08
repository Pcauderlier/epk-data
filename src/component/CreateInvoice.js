import { Page, Text, Image, Document, StyleSheet, View, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import React from "react"
import logo from "../img/LOGO_EPK.png"



export default function CreateInvoice({commande}){
    const style = StyleSheet.create({
        page : {
            marginLeft : 50,
                       
        },
        image : {
            height : 150,
            width : 150,
            position : 'absolute',
            top : 20,
            right : 70
        },
        p1 : {
            fontSize : 14,
            lineHeight : 1.8,
            position : 'absolute',
            top : 80
            
        },
        p2 :{
            position : 'absolute',
            right : 90,
            top : 190,
            fontSize : 14,
            lineHeight : 1.8,
        },
        p3 : {
            position : 'absolute',
            top : 300,
            left : 150,
            fontSize : 14,
            lineHeight : 1.8,

        }
    });   
    
    const Invoice = () => (
        <Document>
            <Page style={style.page}>
                <Image src={logo} style={style.image}/>
                <View>
                    <View style={style.p1}>
                        <Text style={{color : 'red', fontSize : 18, lineHeight : 2, textDecoration : 'underline'}}>Ecole Professionnelle de Kinésiologie SRL</Text>
                        <Text>Rue Jérôme Noël, 19</Text>
                        <Text>1325 Chaumont Gistoux</Text>
                        <Text>Téléphone : 0475/30 58 82</Text>
                        <Text>Numéro TVA : BE 0764.541.825</Text>
                        <Text>IBAN  BE 49-7320-5818-2671</Text>
                    </View>
                    <View style={style.p2}>
                        <Text style={{textDecoration : 'underline', fontSize : 16}}>Facture n°EPK 23-{commande.order_number}</Text>
                        <Text>Date : {commande.order_date}</Text>
                    </View>
                    <View style={style.p3}>
                        <Text style={{textDecoration : 'underline', fontSize : 16}}>Client :</Text>
                        <Text>Societé : {commande.sociaty}</Text>
                        <Text>Nom : {commande.billing_name}</Text>
                        <Text>Adresse : {commande.sociaty_adress}</Text>
                        <Text>Ville : {commande.billing_city}</Text>
                        <Text>TVA : </Text>
                    </View>
                </View>
            </Page>
       </Document>
    );
    
    return (
        <div>
            <div>
                <PDFViewer
                width={600}
                height={900}
                >
                    <Invoice/>
                </PDFViewer>
            </div>
            <div>
                <PDFDownloadLink
                document={<Invoice/>}
                fileName={`Facture commande ${commande.order_number}`}>
                    <button>Télécharger la Facture</button>
                </PDFDownloadLink>
            </div>
        </div>   
   )
}