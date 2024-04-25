import express from 'express';
import { connect } from 'mongoose';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dotenv from 'dotenv';
import multer from 'multer';
import bodyParser from 'body-parser';
dotenv.config();
const router = express.Router();
const app = express();
// Set up multer storage
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });


app.use(cors({ credentials: true, origin: [ process.env.APP_URL ] }));
app.use(express.json());
app.use(bodyParser.json());


let userProfile = {
  username: '',
  name: '',
  aboutMe: ''
};






let passwords = [];

app.get('/api/passwords', (req, res) => {
  res.json(passwords);
});

app.post('/api/passwords', (req, res) => {
  const { website, username, password } = req.body;
  if (!website || !username || !password) {
    return res.status(400).json({ error: 'Please provide website, username, and password.' });
  }
  const newPassword = { website, username, password };
  passwords.push(newPassword);
  res.status(201).json(newPassword);
});

app.put('/api/passwords/:website', (req, res) => {
  const { website } = req.params;
  const { username, password } = req.body;
  const index = passwords.findIndex((p) => p.website === website);
  if (index === -1) {
    return res.status(404).json({ error: 'Password not found.' });
  }
  passwords[index] = { ...passwords[index], username, password };
  res.json(passwords[index]);
});

app.delete('/api/passwords/:website', (req, res) => {
  const { website } = req.params;
  const index = passwords.findIndex((p) => p.website === website);
  if (index === -1) {
    return res.status(404).json({ error: 'Password not found.' });
  }
  passwords.splice(index, 1);
  res.status(204).send();
});







app.post('/api/posts', async (req, res) => {
  const { content } = req.body;

  try {
    const newPost = new Post({ content });

    await newPost.save();

    res.status(200).send('Post uploaded successfully.');
  } catch (error) {
    console.error('Error uploading post:', error);
    res.status(500).send('Internal server error');
  }
});







app.get('/api/profile', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profiles' });
  }
});
app.post('/api/profile', (req, res) => {
  const { username, name, aboutMe } = req.body;

  userProfile.username = username || userProfile.username;
  userProfile.name = name || userProfile.name;
  userProfile.aboutMe = aboutMe || userProfile.aboutMe;

  res.json({ message: 'Profile updated successfully', profile: userProfile });
});






app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/', (req, res) => {
    res.json({ message: "lobalala" })
});
app.get('/users', (req, res) => {
  findAllUsers((error, data) => {
      if (error) {
          res.json(error)
      } else {
          res.json(data)
      }
  })
})

app.get('/users/:id', (req, res) => {
  const userId = req.params.id; // { id: '631c7bd09c89e79615d7e482' }
  findUserById(userId, (error, data) => {
      if (error) {
          return res.json(error)
      }
      return res.json(data)
  })
})

app.get('/api/images', async (req, res) => {
  try {
      const images = await Image.find();
      res.status(200).json(images);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching images' });
  }
});
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
      const newImage = new Image({
          data: req.file.buffer,
          contentType: req.file.mimetype,
      });
      await newImage.save();
      res.status(200).json({ message: 'Image uploaded successfully!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading image' });
  }
});
app.post('/users', (req, res) => {
  const userInformations = req.body
  console.log(userInformations)
  createAndSaveUser(userInformations, (err, data) => {
    if (err) {
      return res.json(err)
    }
    return res.json(data)
  })
})


app.use('/api/auth', usersRouter);
router.get('/api/auth/login', (req, res) => {
  res.status(200).json({ message: 'This route is for user login.' });
});

router.get('/api/auth/register', (req, res) => {
  res.status(200).json({ message: 'This route is for user registration.' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error('MongoDB connection error:', err));


 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });
 