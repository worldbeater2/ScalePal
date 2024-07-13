import { useEffect, useState } from "react"
import axios from "axios";



const useFetch = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://wall-street-journal.p.rapidapi.com/api/v1/getArticleList',
        params: {key: 'BUSINESS'},
        headers: {
          'x-rapidapi-key': '1b55a810e7msh4ae840dc06326ecp1f4387jsn66ad8f4eb851',
          'x-rapidapi-host': 'wall-street-journal.p.rapidapi.com'
        }
      };
      
      

      try {
        const response = await axios.request(options);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data, error };
};
    

export default useFetch 