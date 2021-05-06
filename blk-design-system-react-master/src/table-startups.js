import './navForm.css';
import React, { useState, useEffect } from "react"
import { Button, Table } from 'reactstrap';
import './startups.css'
import {ExportCSV} from './ExportCSV';
import ReactNotificationsComponent, {store} from "react-notifications-component"
import 'react-animated-css/lib/'
import 'react-notifications-component/dist/theme.css'
import { io } from 'socket.io-client'
import Footer from "components/Footer/Footer.js";


const fileName = 'Startups';
let socket

const Table2 = ({
   startups = [],
   fetchAllStartups = f => f,
   filtreStartups = f=> f
}) => {
   const [response, setResponse] = useState("");
   useEffect(() => {
      socket = io("http://localhost:3006/", { forceNew: true })
      // socket.on("connection", () => {
      //    console.log("coucou")

      //    console.log(socket.id)  

      // })
      console.log("test")
      socket.on("FromSERV", data => {
         console.log(data);
         setResponse(data);
       });
      console.log(socket)
      fetchAllStartups()
   }, fetchAllStartups)

   const data = () => {
      return startups.map((Startup) => {
         const { name, website, linkedin ,namesource,taille, lieu,secteur} = Startup
         return ( {name,website, linkedin ,namesource,taille, lieu,secteur})})
   }

const handleOnClickDefault = () =>{
   store.addNotification({
      title: "Nouvelle Startups :",
      message:response,
      type:"info",
      container:"top-right",
      insert:"top",
      dismiss:{
         duration: 2000
      }

   })
}

   
   const [filtre, setFiltre] = useState({
      source: 0
   })
   function handleChangeSource(e) {
      e.preventDefault()
      setFiltre(
         {
            ...filtre,
            source: e.target.value
         }
      )
   }

   
   const renderTableHeader = () => {
      if (startups.length) {
         let header = Object.keys(startups[0])
         return header.map((key, index) => {
            return <th  key={index}>{key.toUpperCase()}</th>
         })
      }

   }

   function connectToSocketIo(e){
      console.log('hello')
      e.preventDefault()
      socket.emit('connected', true)

   }

   const renderTableData = () => {
      return startups.map((Startup, index) => {
         const { name, website , linkedin, namesource,taille, lieu,secteur } = Startup
         return (
            
            <tr>
               <td >
               <a >{name}</a>
               </td>

               <td >
               <a href={taille}>taille</a>
               </td>

               <td >
               <a href={lieu}>lieulieulieulieulieulieu</a>
               </td>

               <td >
                  <a href={website}>{website ? name : ''}</a>
                  </td>

               <td >
               <a href={secteur}>lieulieulieulieulieu</a>
               </td>

               <td >
                  <a href={linkedin}>{website ? name : ''}</a>
                  </td>

               {/* <td >
               <a href={found_info}>{found_info}</a>
               </td> */}

                  <td >
                  <a href={namesource}>{namesource}
                  </a></td>

              


            </tr>

         )

      })
   }
   return <div >
      
     
         <>
         <p>
      It's <p dateTime={response}>{response}</p>
    </p>
        <nav className="box">

         <div className=" justify-content-center element sourcedropdown" >
   
   <select className="form-control" name="Source" onChange={e => handleChangeSource(e)} >
      <option selected>Select Source</option>
      <option value={1}>Welcom to the jungle </option>
      <option value={2}>Frentchtech</option>
      
   </select>

</div>

<Button id="button" onClick={e => {filtreStartups(filtre)}}>Submit</Button>

</nav>
         <ReactNotificationsComponent></ReactNotificationsComponent>
         
           
            <div className=" d-flex justify-content-center">
            <ExportCSV csvData={data()} fileName={fileName} />
            <Button onClick = {handleOnClickDefault}>
            Default
         </Button>
         <Button onClick = {connectToSocketIo}> Connect</Button>
            </div>
            <br/> 
            { <h1 id='title'>Start-ups List Table : {startups.length} - startup</h1>}
            <div class="d-inline-flex p-5 justify-content-center">
            <Table >
            <tbody class="text-sm-center">

               <tr >{renderTableHeader()}</tr>

               {renderTableData()}

               </tbody>
            </Table>
            </div>
        <Footer />
           
         </ >
      
      
   </div>
}


export default Table2 