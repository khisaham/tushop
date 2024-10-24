const request = require('supertest');
const express = require('express');
const routes = require('../routes/routes');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(express.json());
app.use('/api', routes);

describe('POST /api/maximize-profit', () => {
  it('should return correct tasks and earnings for a valid input (Case 1)', async () => {
    const response = await request(app)
      .post('/api/maximize-profit')
      .send({
        jobs: [
          { start_time: '0900', end_time: '1030', profit: 100 },
          { start_time: '1000', end_time: '1200', profit: 500 },
          { start_time: '1100', end_time: '1200', profit: 300 }
        ]
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      tasks_for_others: 2,
      earnings_for_others: 400
    });
  });

  it('should return correct tasks and earnings for a valid input (Case 2)', async () => {
    const response = await request(app)
      .post('/api/maximize-profit')
      .send({
        jobs: [
          { start_time: '0900', end_time: '1000', profit: 250 },
          { start_time: '0945', end_time: '1200', profit: 550 },
          { start_time: '1130', end_time: '1500', profit: 150 }
        ]
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      tasks_for_others: 2,
      earnings_for_others: 400
    });
  });

  it('should return an error for invalid input', async () => {
    const response = await request(app)
      .post('/api/maximize-profit')
      .send({
        jobs: 'invalid_data'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'Invalid input, jobs must be an array'
    });
  });
});

describe('POST /api/goodies', () => {
    const inputFilePath = path.join(__dirname, '..', 'files', 'sample_input.txt');
    const outputFilePath = path.join(__dirname, '..', 'files', 'sample_output.txt');
  
    beforeEach(() => {
      // Ensure the sample input exists before running tests
      const inputData = `
        Fitbit Plus: 7980
        IPods: 22349
        MI Band: 999
        Cult Pass: 2799
        Macbook Pro: 229900
        Digital Camera: 11101
        Alexa: 9999
        Sandwich Toaster: 2195
        Microwave Oven: 9800
        Scale: 4999
      `;
      fs.writeFileSync(inputFilePath, inputData);
    });
  
    afterEach(() => {
      // Clean up the output file after tests
      if (fs.existsSync(outputFilePath)) {
        fs.unlinkSync(outputFilePath);
      }
    });
  
    it('should distribute goodies and write to the output file (Case 1)', async () => {
      const response = await request(app)
        .post('/api/goodies')
        .send({
          inputFilePath,
          outputFilePath,
          numEmployees: 4
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Goodies distributed successfully',
        outputFilePath
      });
  
      const outputData = fs.readFileSync(outputFilePath, 'utf8');
      expect(outputData).toContain('Fitbit Plus: 7980');
      expect(outputData).toContain('Microwave Oven: 9800');
      expect(outputData).toContain('Alexa: 9999');
      expect(outputData).toContain('Digital Camera: 11101');
    });
  
    it('should distribute goodies and write to the output file (Case 2)', async () => {
      const response = await request(app)
        .post('/api/goodies')
        .send({
          inputFilePath,
          outputFilePath,
          numEmployees: 6
        });
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Goodies distributed successfully',
        outputFilePath
      });
  
      const outputData = fs.readFileSync(outputFilePath, 'utf8');
      expect(outputData).toContain('Sandwich Toaster: 2195');
      expect(outputData).toContain('Cult Pass: 2799');
      expect(outputData).toContain('Scale: 4999');
      expect(outputData).toContain('Alexa: 9999');
    });
  
    it('should return an error for missing parameters', async () => {
      const response = await request(app)
        .post('/api/goodies')
        .send({
          inputFilePath
        });
  
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Please provide inputFilePath, outputFilePath, and numEmployees'
      });
    });
  });