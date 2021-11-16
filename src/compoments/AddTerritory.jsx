import {Modal,Form,Select, message } from "antd";
import React, {useState, useEffect, Fragment} from "react";
import httpclient from"../services/http-client"

function AddTerritory(props) {
    const [form] = Form.useForm();
    const[regionstate,setregionstate]=useState({
        regiondata:[],
        loanding:true

    });

    const{regiondata,loanding:regionloandig}=regionstate;

    //**Returns a random integer between min (included) and max (excluded)
     // **Using Math.round () will give you a non-uniform distribution!
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    useEffect(() => {
        loadRegion();
      
    }, []);

    const loadRegion =async()=>{
       const res=await httpclient.get("api/Region");
       setregionstate({
            regiondata:res.data,
            loanding:false
        })
    }
 //** for craeting new territory
  const saveTerritoy= async function (values) {
        try{
            const res= await httpclient.post("api/Territory",{
            territoryDescription: values.territoryDescription,
            TerritoryId:getRandomInt(1,100000).toString(),
            regionId:values.regionId,
            });
          console.log(res.data);
          form.resetFields();
          props.onSaveTerritory(res.data);
         
         

        }catch(error){
            message.error("Can not create territory " + error.message);
        }
    }
    //** for edit new territory
    const editTerritoty=async function(values){
        try{
            const res= await httpclient.put(`api/Territory/${values.territoryId}`,values)
              
           props.onEditTerritory(values);
        }catch(error){
         message.error("Can not edit territory " + error.message);
        }
    }

    return (
        <Fragment>
            <Modal visible={true} title={props.EditTerritory?"Edit territory":"Add territory"}
                onCancel={()=>  {
                    props.onCancel();
                }}
                onOk={()=>{
                  form.validateFields().then((values)=>{
                      if(values.territoryId){
                        editTerritoty({
                            ...props.EditTerritory,
                            ...values
                        })
                      
                    }else{
                    saveTerritoy(values);
                  }});
                   
                }}
            >
                <Form layout="vertical" form={form} initialValues={props.EditTerritory}>
                    <Form.Item name="territoryId">
                        <input type="hidden"  />
                    </Form.Item>

                    <Form.Item 
                    label="Territory Name" 
                    name="territoryDescription" 
                    rules={[{required: true, message:"Please enter the territory name"}]}
                    >   
                        <input style={{width:"100%"}} type="text" placeholder="Territory Name"/>
                    </Form.Item>

                    <Form.Item 
                      label="Region"
                       name="regionId">
                        <Select
                           loading={regionloandig}
                         
                            options={regiondata.map((items)=>{ 
                                return{
                                    value:items.regionId,
                                    label:items.regionDescription
                                   
                                };
                            })}
                        /> 
                        
                    </Form.Item>
                </Form>
            </Modal>
           
        </Fragment>

    );
};
export default AddTerritory;