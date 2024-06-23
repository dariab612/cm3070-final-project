const router = require('express').Router();
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const { Client } = require('../db/models');
const { Course } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    let client;
    if (req.session && req.session.user) {
      client = await Client.findOne({
        where: {
          telephone: req.session.user.telephone,
        },
        raw: true
      });
    }
    if (!(client && client.name && client.lastname)) {
      return res.status(404).send('Client not found');
    }

    const { courseId } = req.body.obj;
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
      raw: true
    });

    try {
      const templatePath = path.join(__dirname, '../..', 'client', 'public', 'images', 'certificate.jpeg');
      const sanitizedCourseName = course.name.replace(/\s+/g, '');
      const outputPath = path.join(__dirname, '../..', 'client', 'public', 'images', `${client.name}${client.lastname}${sanitizedCourseName}certificate.jpeg`);

      const image = await loadImage(templatePath);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(image, 0, 0, image.width, image.height);

      ctx.font = '45px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // Calculate the position for the name
      const nameText = `${client.name} ${client.lastname}`;
      const x = canvas.width / 2;
      const y = canvas.height / 2;

      // Draw the name onto the certificate
      ctx.fillText(nameText, x, y);

      // Calculate the position for the course name
      const courseText = `${course.name}`;
      const xCourse = canvas.width / 2;
      const yCourse = canvas.height / 2.9;

      // Draw the course name onto the certificate
      ctx.fillText(courseText, xCourse, yCourse);

      // Get current date
      const currentDate = new Date();
      const dateText = currentDate.toLocaleDateString('en-GB').replace(/\//g, '.'); // Format date as 22.06.24

      // Calculate the position for the date
      const xDate = canvas.width / 3.4;
      const yDate = canvas.height / 1.28;

      // Draw the date onto the certificate
      ctx.fillText(dateText, xDate, yDate);

      // Save the new image
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);

      console.log('Certificate generated:', outputPath);

      const courseUpdated = await Course.update(
        {
          certificate: `/images/${client.name}${client.lastname}${sanitizedCourseName}certificate.jpeg`
        },
        {
        where: {
          id: courseId,
        },
        raw: true
      });

      console.log('Course certificate url added:', courseUpdated)
      return res.status(200).json({ img: `/images/${client.name}${client.lastname}${sanitizedCourseName}certificate.jpeg`});
    } catch (error) {
      res.status(500).json({error: 'Error generating certificate: ' + error.message });
    }
  });

module.exports = router;
