import React, {useState, useEffect} from "react";
import { CgLogOut } from "react-icons/cg";
import Nava from './Nava';
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Admin() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [details, setDetails] = useState();
  const [username, setUsername] = useState();


  const logout = async (e) => {
    try {
      await axios
        .get("https://corp.heritagefinancialcu.com/logout-admin")
        .then((result) => {
          console.log(result);
          navigate(`/adlogin`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 400) {
            console.log("error400");
          } else {
            console.log("error404");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };


  const updateAll = async () => {
    console.log("take");
    try {
      await axios
        .get("https://heritagefinancialcu.com/admin-details")
        .then((result) => {
          console.log(result);
          setUser(result.data.adminUsers);
          setDetails(result.data)
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 400) {
            console.log("error400");
          } else {
            console.log("error404");
          }
        }); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateAll();
  }, []);



  const delUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://heritagefinancialcu.com/del-user", {
          username: username    
        })
        .then((result) => {
          console.log(result);
            alert(result.data)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };



  



  return (
    <div className='cht'>
      <Nava />  
      <p className="c2">
        <div className="c21">
          <div className="c2a">Welcome Admin</div>
          <div className="c2b" onClick={logout}>
            <CgLogOut className="c2bb" />
            Logout
          </div>
        </div>
      </p>
      <div className="atable">
      <table  className='adt'>
        <thead className='ad2a'>
          <tr>
            <th className='ad2b1'>
              Name
            </th>
          </tr>
        </thead>
        {user?.map((users, key) => (
        <tbody className='ad2b' key={key}>
        <tr>
          <td className='ad2c1'>{users.lastName} {users.firstName}</td>
        </tr>
        </tbody>
          ))}
      </table>
      <table className='ad2'>
        <thead className='ad2a'>
        <tr>
          <th className='ad2b1'>Username</th>
          <th className='ad2b2'>Email</th>
          <th className='ad2b3'>ssn</th>
          </tr>
        </thead>
        {user?.map((users, key) => (
        <tbody className='ad2b' key={key}>
        <tr>
          <td className='ad2c1'>{users.username}</td>
          <td className='ad2c2'>{users.emailAddress}</td>
          <td className='ad2c3'>{users.ssn}</td>
        </tr>
        </tbody>
          ))}
      </table>
      </div>
    </div>
  )
}
