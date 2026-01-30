import 'package:flutter/material.dart';

class BuyerRequestsPage extends StatelessWidget {
  const BuyerRequestsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),
      appBar: AppBar(
        title: const Text('Buyer Requests'),
        leading: const BackButton(),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: Icon(Icons.tune),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            AIRecommendationCard(),
            SizedBox(height: 24),
            OtherBuyersSection(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}


class AIRecommendationCard extends StatelessWidget {
  const AIRecommendationCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: const Color(0xFF2E7D32), width: 1.5),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Chip(
                label: Text('AI Recommendation'),
                backgroundColor: Color(0xFFDFF3E3),
                labelStyle: TextStyle(color: Color(0xFF2E7D32)),
              ),
              Spacer(),
              Chip(
                label: Text('BEST MATCH'),
                backgroundColor: Color(0xFF2E7D32),
                labelStyle: TextStyle(color: Colors.white),
              ),
            ],
          ),
          const SizedBox(height: 12),

          const BuyerHeader(
            name: 'Rajesh Kumar',
            rating: '4.9',
            deals: '120+ deals',
            avatar: Icons.person,
          ),

          const SizedBox(height: 16),

          Row(
            children: const [
              InfoPill(label: 'OFFERED PRICE', value: '₹2,450 / quintal'),
              SizedBox(width: 12),
              InfoPill(label: 'DISTANCE', value: '12.5 km away'),
            ],
          ),

          const SizedBox(height: 16),

          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  child: const Text('Accept Offer',style: TextStyle(fontSize: 14),),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton(
                  onPressed: () {},
                  child: const Text('Negotiate'),
                ),
              ),
              const SizedBox(width: 8),
              IconButton(
                onPressed: () {},
                icon: const Icon(Icons.close, color: Colors.red),
              ),
            ],
          ),
        ],
      ),
    );
  }
}


class BuyerHeader extends StatelessWidget {
  final String name;
  final String rating;
  final String deals;
  final IconData avatar;

  const BuyerHeader({
    super.key,
    required this.name,
    required this.rating,
    required this.deals,
    required this.avatar,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          radius: 22,
          backgroundColor: const Color(0xFFDFF3E3),
          child: Icon(avatar, color: const Color(0xFF2E7D32)),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.star, size: 14, color: Colors.orange),
                  const SizedBox(width: 4),
                  Text('$rating  ($deals)',
                      style: const TextStyle(color: Colors.grey)),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}


class InfoPill extends StatelessWidget {
  final String label;
  final String value;

  const InfoPill({
    super.key,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: const Color(0xFFF1F8F4),
          borderRadius: BorderRadius.circular(14),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label,
                style: const TextStyle(fontSize: 11, color: Colors.grey)),
            const SizedBox(height: 4),
            Text(
              value,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}


class OtherBuyersSection extends StatelessWidget {
  const OtherBuyersSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text(
          'Other Interested Buyers',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
        SizedBox(height: 12),
        BuyerTile(
          name: 'Priya Singh',
          price: '₹2,380',
          rating: '4.5',
          distance: '8.2 km away',
        ),
        BuyerTile(
          name: 'Amit Patel',
          price: '₹2,410',
          rating: '4.2',
          distance: '20 km away',
        ),
        BuyerTile(
          name: 'Suresh Raina',
          price: '₹2,350',
          rating: '4.0',
          distance: '45 km away',
        ),
      ],
    );
  }
}

class BuyerTile extends StatelessWidget {
  final String name;
  final String price;
  final String rating;
  final String distance;

  const BuyerTile({
    super.key,
    required this.name,
    required this.price,
    required this.rating,
    required this.distance,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: Color(0xFFDFF3E3),
            child: Icon(Icons.person, color: Color(0xFF2E7D32)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name,
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text('$rating ★ • $distance',
                    style: const TextStyle(color: Colors.grey)),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(price,
                  style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 6),
              Row(
                children: [
                  TextButton(
                    onPressed: () {},
                    child: const Text('Accept'),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text('Negotiate'),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}

