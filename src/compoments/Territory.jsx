import { message, Table, PageHeader, Button } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import AddTerritory from "./AddTerritory";
import httpclient from"../services/http-client"
function Territory() {
  const [territory, setTerritory] = useState({
    loading: true,
    dataTerritory: [],
  });

  const [territoryFormState, setTerritoryFormState] = useState({
    dataEditTerritory: null,
    visible: false,
  });
  const { dataEditTerritory: selectTerritory, visible: Formvisible } =
    territoryFormState;
  console.log(selectTerritory);

  useEffect(() => {
    httpclient
      .get("api/Territory")
      .then((res) => {
        console.log(res.data);
        setTerritory({
          loading: false,
          dataTerritory: res.data,
        });
      })
      .catch((err) => {
        message.error("Can not loanding" + err.message);
        setTerritory({
          loading: false,
          dataTerritory: [],
        });
      });
  }, []);

  const { dataTerritory, loading } = territory;
  const hiddenForm = () => {
    setTerritoryFormState({
      ...territoryFormState,
      visible: false,
      dataEditTerritory: null,
    });
  };
//**for delete a territory */
  const Deleteterritoy = async (territory) => {
      try{
        await httpclient.delete(`api/Territory/${territory.territoryId}`)
        .then(() => {
          message.success("Delete success");
          setTerritory({
            ...territory,
            dataTerritory: dataTerritory.filter(
              (item) => item.territoryId !== territory.territoryId
            ),
          });
        })
        
      }catch(err){
        message.error("Delete fail" + err.message);
      };
  };

  return (
    <Fragment>
      <PageHeader
        title="Territory"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setTerritoryFormState({
                ...territoryFormState,
                visible: true,
              });
            }}
          >
            Add Territory
          </Button>,
        ]}
      />

      <Table
        loading={loading}
        pagination={{ pageSize: 8 }}
        columns={[
          { key: 0, title: "TerritoryId", dataIndex: "territoryId", width: 100 },
          {
            key: 0,
            title: "Description",
            dataIndex: "territoryDescription",
            width: 100
          },
          {
            key: 0,
            title: "Region",
            dataIndex: "regionDescription",
            width: 100
          },
          {
            title: "Actions",
            width: 100,
           
            render: (record) => {
              return (
                <Fragment>
                  <Button
                    type="link"
                    onClick={() => {
                      setTerritoryFormState({
                        ...territoryFormState,
                        dataEditTerritory: record,
                        visible: true,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    style={{ color: "red" }}
                    onClick={() => {
                      Deleteterritoy(record);
                    }}
                  >
                    Delete
                  </Button>
                </Fragment>
              );
            },
          },
        ]}
        dataSource={dataTerritory}
      />
      {Formvisible && (
        <AddTerritory
          EditTerritory={selectTerritory}
          onEditTerritory={(territoyUpdated) => {
            hiddenForm();

            setTerritory({
              dataTerritory: dataTerritory.map((item) => {
                return item.territoryId === territoyUpdated.territoryId
                  ? territoyUpdated
                  : item;
              }),
              loading: false,
            });
            message.success("territory updated successfully");
          }}
          onSaveTerritory={(newTerritory) => {
            setTerritory({
              dataTerritory: [newTerritory, ...dataTerritory],
              loading: false,
            });
            setTerritoryFormState({
              ...territoryFormState,
              visible: false,
              dataTerritory: null,
            });
            message.success("Territory Added");
           
          }}
          onCancel={() => {
            hiddenForm();
          }}
        />
      )}
    </Fragment>
  );
}
export default Territory;
