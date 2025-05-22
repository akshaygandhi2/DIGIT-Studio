import React from "react";
import { useState, useEffect, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { FormComposerV2, Loader, Toast } from "@egovernments/digit-ui-components";
import CreateCheckListConfig from "../../../configs/createCheckListConfig.js";
import { updateCheckListConfig } from "../../../configs/createCheckListConfig.js";
import { useParams } from "react-router-dom";
import transformViewCheckList from "../../../utils/createUtils.js";
import { transformCreateCheckList } from "../../../utils/createUtils.js";

const CreateCheckList = () => {
  const { accid, id, code } = useParams();
  const { t } = useTranslation();
  const [cardItems, setCardItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [defValues,setDefValues]=useState({});
  const [update,setUpdate]=useState(false);
  const [ loading, setLoading]=useState(false);

  const [config, setConfig] = useState(null);

  const def_search_request = {
    url: "/health-service-request/service/definition/v1/_search",
    params: {},
    body: {},
    method: "POST",
    headers: {},
    config: {
      enable: false,
    },
  }
  const smutation = Digit.Hooks.useCustomAPIMutationHook(def_search_request);

  const create_request = {
    url: "/health-service-request/service/v1/_create",
    params: {},
    body: {},
    method: "POST",
    headers: {},
    config: {
      enable: false,
    },
  }
  const cmutation = Digit.Hooks.useCustomAPIMutationHook(create_request);

  const search_request = {
    url: "/health-service-request/service/v1/_search",
    params: {},
    body: {},
    method: "POST",
    headers: {},
    config: {
      enable: false,
    },
  }
  const mutation = Digit.Hooks.useCustomAPIMutationHook(search_request);

   const update_request = {
    url: "/health-service-request/service/v1/_update",
    params: {},
    body: {},
    method: "POST",
    headers: {},
    config: {
      enable: false,
    },
  }
  const umutation = Digit.Hooks.useCustomAPIMutationHook(update_request);

  const getapp = async (id, accid) => {
    await mutation.mutate(
      {
        url: '/health-service-request/service/v1/_search',
        method: "POST",
        body: transformViewApplication(id, accid),
        config: {
          enable: false,
        },
      },
      {
        onSuccess: (res) => {
          let field = res.Services.filter(items => items.serviceDefId == id);
          if(field.length>0){
            setUpdate(true);
          }
          const defaultValue = field[0].attributes.reduce((acc, attr) => {
            if(attr.value=="NOT_SELECTED"){
              acc[attr.attributeCode] = "";
            }
            else{
              acc[attr.attributeCode] = {code: attr.value, name: `${code}.${attr.attributeCode}.${attr.value}`};
            }
            console.log(acc,"default");
            return acc;
          }, {});
          setDefValues(defaultValue);
          setLoading(true);
        },
        onError: () => {
          console.log("Error checking filled status");
          setLoading(true);
        },
      }
    )
  }

  const getcarditems = async (code) => {
    await smutation.mutate(
      {
        url: "/health-service-request/service/definition/v1/_search",
        method: "POST",
        body: transformViewCheckList(code),
        config: {
          enable: false,
        },
      },
      {
        onSuccess: (res) => {
          console.log(res, "application_response");
          setCardItems(res?.ServiceDefinitions || []);
        },
        onError: () => {
          console.log("Error occurred");
          setCardItems([]);
        },
      }
    )
  }

  useEffect(() => {
    getapp(id, accid);
    getcarditems([code]);
  }, [code]);

  useEffect(() => {
    if (cardItems && cardItems.length > 0) {
      setConfig(CheckListConfig(cardItems));
    }
  }, [cardItems]);

  const onSubmit = async (data) => {
    const fetchdata = async (data) => {
      await cmutation.mutate(
        {
          url: "/health-service-request/service/v1/_create",
          method: "POST",
          body: transformCreateCheckList(id, accid, data),
          config: {
            enable: false,
          },
        },
        {
          onSuccess: (res) => {
            console.log(res, "application_response");
          },
          onError: () => {
            console.log("Error occurred");
          },
        }
      )
    }
    fetchdata(data);
  };

  const handleFormValueChange = (updatedFormData) => {
    console.log(updatedFormData,"form_data");
    if (JSON.stringify(updatedFormData) !== JSON.stringify(formData)) {
      setFormData(updatedFormData);
      setConfig(updateCheckListConfig(config, updatedFormData));
    }
  };

  const onSaveAsDraft = async (data)  =>{
    const updatefetchdata = async (data) => {
      await umutation.mutate(
        {
          url: "/health-service-request/service/v1/_update",
          method: "POST",
          body: transformCreateCheckList(id, accid, data),
          config: {
            enable: false,
          },
        },
        {
          onSuccess: (res) => {
            console.log(res, "application_response");
          },
          onError: () => {
            console.log("Error occurred");
          },
        }
      )
    }
    if(update){
    updatefetchdata(data);
    }
    else{
      onSubmit(data);
    }
  }

  return (
    <div>
      {config && loading ? (
        <FormComposerV2
          defaultValues={defValues}
          label={t("Submit")}
          config={config}
          onFormValueChange={(setValue, formData) => { handleFormValueChange(formData) }}
          onSubmit={onSaveAsDraft}
          fieldStyle={{ marginRight: 2 }}
          secondaryActionLabel={t("Save as Draft")}
          onSecondayActionClick={onSaveAsDraft}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CreateCheckList;