import request from 'supertest';
import express from 'express';
import router from '../pages/authors';
import Author from '../models/author';

const app = express();
app.use('/authors', router);

jest.mock('../models/author');

describe('GET /authors', () => {

    it('should return a list of authors sorted by family name', async () => {
        const mockAuthors = [
            { name: 'Doe, John', lifetime: '1900-1980' },
            { name: 'Smith, Jane', lifetime: '1920-2000' }
        ];

        (Author.getAllAuthors as jest.Mock).mockResolvedValue(mockAuthors);

        const response = await request(app).get('/authors');

        expect(response.status).toBe(200);
        expect(response.text).toEqual(JSON.stringify(mockAuthors));
    });

    it('should return "No authors found" when there are no authors', async () => {
        (Author.getAllAuthors as jest.Mock).mockResolvedValue([]);

        const response = await request(app).get('/authors');

        expect(response.status).toBe(200);
        expect(response.text).toBe('No authors found');
    });

    it('should return a 500 status code when there is an error', async () => {
        (Author.getAllAuthors as jest.Mock).mockRejectedValue(new Error('Database error'));

        const response = await request(app).get('/authors');

        expect(response.status).toBe(500);
        expect(response.text).toBe('No authors found');
    });
});
