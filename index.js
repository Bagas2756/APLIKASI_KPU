const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios')

const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/db_kpu', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', () => {
  console.log('Terhubung ke MongoDB');
});

// Skema data Mongoose
const itemSchema = new mongoose.Schema({
  nik: String,
  name: String,
  telp: String,
  gender: String,
  date: Date,
  city: String,
  city_name: String,
  address: String,
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.json());

// Routes
app.get('/itemsKpu', async (req, res) => {
  try {
    const itemsKpu = await Item.find();
    res.json(itemsKpu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/itemsKpu', async (req, res) => {
 try {
    const savedItem = await Item.create([{
      nik: req.query.nik,
      name: req.query.name,
      telp: req.query.telp,
      gender: req.query.gender,
      date: req.query.date,
      city: req.query.city,
      city_name: req.query.city_name,
      address: req.query.address,
 }])
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/itemsKpu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete('/itemsKpu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.deleteOne({_id: id});
    res.json(deletedItem);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get('/rajaongkir/city', async (req, res) => {
    try {
    //   const response = await axios.get('https://pro.rajaongkir.com/api/city', {
    //     headers: {
    //       key,
    //     },
    //   });
  
      // Langsung kirim data ke klien tanpa perlu mengonversi ke JSON
      const result = []

      for (const item of dataDummyCity) {
        const finder = result.find(data => data.province === item.province)
        if(!finder) result.push({province: item.province})
      }

      res.status(200).json({data: result});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dari RajaOngkir' });
    }
  });

  app.get('/rajaongkir/city', async (req, res) => {
    try {
    //   const response = await axios.get('https://pro.rajaongkir.com/api/city', {
    //     headers: {
    //       key,
    //     },
    //   });
  
      // Langsung kirim data ke klien tanpa perlu mengonversi ke JSON
      const result = []

      for (const item of dataDummyCity) {
        const finder = result.find(data => data.province === item.province)
        if(!finder) result.push({province: item.province})
      }

      res.status(200).json({data: result});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dari RajaOngkir' });
    }
  });
  app.get('/rajaongkir/city-name', async (req, res) => {
    try {
    //   const response = await axios.get('https://pro.rajaongkir.com/api/city', {
    //     headers: {
    //       key,
    //     },
    //   });
  
      // Langsung kirim data ke klien tanpa perlu mengonversi ke JSON
      const result = []

      for (const item of dataDummyCity) {
        const finder = result.find(data => data.city_name === item.city_name)
        if(!finder) result.push({city_name: item.city_name})
      }

      res.status(200).json({data: result});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data dari RajaOngkir' });
    }
  });


app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});


const dataDummyCity = [
    {
        "city_id": "151",
        "province_id": "6",
        "province": "DKI Jakarta",
        "type": "Kota",
        "city_name": "Jakarta Barat",
        "postal_code": "11220"
    },
    {
        "city_id": "152",
        "province_id": "6",
        "province": "DKI Jakarta",
        "type": "Kota",
        "city_name": "Jakarta Pusat",
        "postal_code": "10540"
    },
    {
        "city_id": "153",
        "province_id": "6",
        "province": "DKI Jakarta",
        "type": "Kota",
        "city_name": "Jakarta Selatan",
        "postal_code": "12230"
    },
    {
        "city_id": "154",
        "province_id": "6",
        "province": "DKI Jakarta",
        "type": "Kota",
        "city_name": "Jakarta Timur",
        "postal_code": "13330"
    },
    {
        "city_id": "155",
        "province_id": "6",
        "province": "DKI Jakarta",
        "type": "Kota",
        "city_name": "Jakarta Utara",
        "postal_code": "14140"
    },
    {
        "city_id": "156",
        "province_id": "8",
        "province": "Jambi",
        "type": "Kota",
        "city_name": "Jambi",
        "postal_code": "36111"
    },
    {
        "city_id": "157",
        "province_id": "24",
        "province": "Papua",
        "type": "Kabupaten",
        "city_name": "Jayapura",
        "postal_code": "99352"
    },
    {
        "city_id": "158",
        "province_id": "24",
        "province": "Papua",
        "type": "Kota",
        "city_name": "Jayapura",
        "postal_code": "99114"
    },
    {
        "city_id": "159",
        "province_id": "24",
        "province": "Papua",
        "type": "Kabupaten",
        "city_name": "Jayawijaya",
        "postal_code": "99511"
    },
    {
        "city_id": "160",
        "province_id": "11",
        "province": "Jawa Timur",
        "type": "Kabupaten",
        "city_name": "Jember",
        "postal_code": "68113"
    },
    {
        "city_id": "161",
        "province_id": "1",
        "province": "Bali",
        "type": "Kabupaten",
        "city_name": "Jembrana",
        "postal_code": "82251"
    },
    {
        "city_id": "162",
        "province_id": "28",
        "province": "Sulawesi Selatan",
        "type": "Kabupaten",
        "city_name": "Jeneponto",
        "postal_code": "92319"
    },
    {
        "city_id": "163",
        "province_id": "10",
        "province": "Jawa Tengah",
        "type": "Kabupaten",
        "city_name": "Jepara",
        "postal_code": "59419"
    },
    {
        "city_id": "164",
        "province_id": "11",
        "province": "Jawa Timur",
        "type": "Kabupaten",
        "city_name": "Jombang",
        "postal_code": "61415"
    },
    {
        "city_id": "165",
        "province_id": "25",
        "province": "Papua Barat",
        "type": "Kabupaten",
        "city_name": "Kaimana",
        "postal_code": "98671"
    },
    {
        "city_id": "166",
        "province_id": "26",
        "province": "Riau",
        "type": "Kabupaten",
        "city_name": "Kampar",
        "postal_code": "28411"
    },
    {
        "city_id": "167",
        "province_id": "14",
        "province": "Kalimantan Tengah",
        "type": "Kabupaten",
        "city_name": "Kapuas",
        "postal_code": "73583"
    },
    {
        "city_id": "168",
        "province_id": "12",
        "province": "Kalimantan Barat",
        "type": "Kabupaten",
        "city_name": "Kapuas Hulu",
        "postal_code": "78719"
    },
    {
        "city_id": "169",
        "province_id": "10",
        "province": "Jawa Tengah",
        "type": "Kabupaten",
        "city_name": "Karanganyar",
        "postal_code": "57718"
    },
    {
        "city_id": "170",
        "province_id": "1",
        "province": "Bali",
        "type": "Kabupaten",
        "city_name": "Karangasem",
        "postal_code": "80819"
    },
    {
        "city_id": "171",
        "province_id": "9",
        "province": "Jawa Barat",
        "type": "Kabupaten",
        "city_name": "Karawang",
        "postal_code": "41311"
    },
]

  
