import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

class MarketPage extends StatelessWidget {
  const MarketPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),
      appBar: AppBar(
        title: const Text('AI Price Insights'),
        leading: const BackButton(),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: Icon(Icons.share),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            CurrentPriceCard(),
            SizedBox(height: 24),
            PriceTrendSection(),
            SizedBox(height: 24),
            BestSellingWindowCard(),
            SizedBox(height: 24),
            NearbyMarketsSection(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}


class CurrentPriceCard extends StatelessWidget {
  const CurrentPriceCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Text(
                '🍅 Tomato',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              Spacer(),
              Chip(
                label: Text('+12%'),
                backgroundColor: Color(0xFFDFF3E3),
                labelStyle: TextStyle(color: Color(0xFF2E7D32)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          const Text(
            'Per Quintal',
            style: TextStyle(color: Colors.grey),
          ),
          const SizedBox(height: 12),
          Row(
            children: const [
              Text(
                '₹3,450',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF2E7D32),
                ),
              ),
              SizedBox(width: 8),
              Text(
                '₹3,100',
                style: TextStyle(
                  color: Colors.grey,
                  decoration: TextDecoration.lineThrough,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: const [
              CircleAvatar(
                radius: 14,
                backgroundColor: Color(0xFFDFF3E3),
                child: Text(
                  '90%',
                  style: TextStyle(
                    fontSize: 11,
                    color: Color(0xFF2E7D32),
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              SizedBox(width: 8),
              Expanded(
                child: Text(
                  'High Confidence AI Prediction\nBased on past 5 years of seasonal data',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}

class PriceTrendSection extends StatelessWidget {
  const PriceTrendSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              'Price Trend',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            Row(
              children: [
                DotLabel('Past', Colors.green),
                SizedBox(width: 8),
                DotLabel('Forecast', Colors.grey),
              ],
            )
          ],
        ),
        const SizedBox(height: 12),
        Container(
          height: 180,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Center(
            child: Text(
              '📊 Line Chart Placeholder',
              style: TextStyle(color: Colors.grey),
            ),
          ),
        )
      ],
    );
  }
}

class DotLabel extends StatelessWidget {
  final String label;
  final Color color;

  const DotLabel(this.label, this.color, {super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(radius: 4, backgroundColor: color),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}


class BestSellingWindowCard extends StatelessWidget {
  const BestSellingWindowCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF2E7D32),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text(
            '✨ Best Selling Window',
            style: TextStyle(color: Colors.white70, fontSize: 12),
          ),
          SizedBox(height: 8),
          Text(
            'Prices are predicted to peak in mid-May.',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 6),
          Text(
            'Consider holding your stock for 3 more weeks\nto maximize profit.',
            style: TextStyle(color: Colors.white70),
          ),
        ],
      ),
    );
  }
}

class NearbyMarketsSection extends StatelessWidget {
  const NearbyMarketsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: const [
            Text(
              'Nearby Markets',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            Text(
              'View Map',
              style: TextStyle(color: Color(0xFF2E7D32)),
            ),
          ],
        ),
        const SizedBox(height: 12),
        const MarketTile(
          name: 'Azadpur Mandi',
          distance: '12km away • High Demand',
          price: '₹3,510',
          change: '+₹60',
          positive: true,
        ),
        const MarketTile(
          name: 'Okhla Market',
          distance: '25km away • Stable',
          price: '₹3,420',
          change: '-₹30',
          positive: false,
        ),
      ],
    );
  }
}

class MarketTile extends StatelessWidget {
  final String name;
  final String distance;
  final String price;
  final String change;
  final bool positive;

  const MarketTile({
    super.key,
    required this.name,
    required this.distance,
    required this.price,
    required this.change,
    required this.positive,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: Color(0xFFDFF3E3),
            child: Icon(Icons.store, color: Color(0xFF2E7D32)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(distance, style: const TextStyle(color: Colors.grey)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(price, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(
                change,
                style: TextStyle(
                  color: positive ? Colors.green : Colors.red,
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
