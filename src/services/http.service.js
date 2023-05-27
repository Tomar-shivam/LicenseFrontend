import http from "../services/http.common";

class LicenseService {

  getByBoj(ApiName, data) {
    return http.post(ApiName, data);
  }

  CreateUpdate(ApiName, data) {
    return http.post(ApiName, data, { responseType: 'blob' });
  }

  get(ApiName) {
    return http.get(`${ApiName}`);
  }

  uploadFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("ipArray", data.ipArray);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    });
  }

  delete(ApiName, data) {
    return http.post(ApiName, data);
  }

  getLocation(ApiName, data) {
    return http.post(ApiName, data);
  }

  getBackup(ApiName) {
    return http.get(ApiName, { responseType: 'blob' });
  }
  
  uploadBackup(ApiName, data) {
    let formdata = new FormData();
    formdata.append("user", data.user)
    formdata.append("file", data.file);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    })
  }

  updateSingleDevice(ApiName, data) {
    console.log(ApiName, data);
    let formData = new FormData();
    formData.append("file", data.file);
    formData.append("ip", data.ip);
    return http.post(ApiName, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    });
  }

  getFirmwarefiles(ApiName, data) {
    return http.post(ApiName, data);
  }
  
  updateFirmwareByUploadedFile(ApiName, data) {
    return http.post(ApiName, data, {
      timeout: 300000,
    });
  }

  uploadFirmwareFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("devicetype", data.devicetype);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    });
  }
  getPresetfiles(ApiName, data) {
    return http.post(ApiName, data);
  }
  updatePresetByUploadedFile(ApiName, data) {
    return http.post(ApiName, data, {
      timeout: 300000,
    });
  }

  uploadPresetFile(ApiName, data) {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("devicetype", data.devicetype);
    return http.post(ApiName, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      processData: false,
      timeout: 300000,
    });
  }
}

export default new LicenseService();
