import data from '../data/analytics.json' assert { type: 'json' };
import { Parser } from 'json2csv';
import fs from 'fs';

export const getAnalytics = async (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error loading analytics' });
  }
};

export const exportAnalytics = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./data/analytics.json', 'utf-8'));
    const parser = new Parser();
    const csv = parser.parse(data.engagement);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics.csv');
    return res.send(csv);
  } catch (e) {
    res.status(500).json({ error: 'Export error' });
  }
};
