import { Request, Response } from 'express';
import { searchPosts } from '../../src/controllers/search.controller';

// Mock the data module
jest.mock('../../src/data.json', () => [
  {
    name: 'Post 1',
    image: 'image1.jpg',
    description: 'This is the first post',
    dateLastEdited: '2023-07-30',
  },
  // Add more mock data if needed
]);

// Define the mockRequest function
const mockRequest = (overrides?: any): Request => {
  const defaultReq = {
    query: {},
  };
  return { ...defaultReq, ...overrides } as Request;
};

// Define the mockResponse function
const mockResponse = (): Response => {
  const res: any = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('searchPosts function', () => {
  it('should return filtered and paginated results when a valid search query is provided', () => {
    const req = mockRequest({
      query: {
        query: 'post',
        sortBy: 'name',
        page: 1,
        limit: 1,
      },
    });
    const res = mockResponse();

    // Call the searchPosts function
    searchPosts(req, res);

    // Expect that the response JSON is called with the correct data
    expect(res.json).toHaveBeenCalledWith({
      httpStatus: 200,
      body: {
        success: true,
        msg: 'Result successfully fetched',
        data: {
          results: [
            {
              name: 'Post 1',
              image: 'image1.jpg',
              description: 'This is the first post',
              dateLastEdited: '2023-07-30',
            },
          ],
          totalPages: 1,
        },
      },
    });
  });

  // Add more test cases here...
});
