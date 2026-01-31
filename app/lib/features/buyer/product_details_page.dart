import 'package:flutter/material.dart';

class ProductDetailsPage extends StatelessWidget {
  const ProductDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),
      body: Column(
        children: [
          const ProductImageHeader(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  ProductTitleSection(),
                  SizedBox(height: 20),
                  AIQualityScoreSection(),
                  SizedBox(height: 20),
                  MarketInsightCard(),
                  SizedBox(height: 20),
                  HarvestDetailsSection(),
                  SizedBox(height: 100),
                ],
              ),
            ),
          ),
          const ProductBottomActions(),
        ],
      ),
    );
  }
}

class ProductImageHeader extends StatelessWidget {
  const ProductImageHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 260,
          decoration: const BoxDecoration(
            color: Colors.black12,
            image: DecorationImage(
              image: AssetImage('assets/images/rice.jpg'), // placeholder
              fit: BoxFit.cover,
            ),
          ),
        ),

        SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _iconBtn(Icons.arrow_back, () => Navigator.pop(context)),
                Row(
                  children: [
                    _iconBtn(Icons.share, () {}),
                    const SizedBox(width: 8),
                    _iconBtn(Icons.favorite_border, () {}),
                  ],
                ),
              ],
            ),
          ),
        ),

        Positioned(
          bottom: 12,
          right: 12,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFF2E7D32),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text(
              '✔ VERIFIED BY AI',
              style: TextStyle(color: Colors.white, fontSize: 11),
            ),
          ),
        ),
      ],
    );
  }

  Widget _iconBtn(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: const BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
        ),
        child: Icon(icon, size: 20),
      ),
    );
  }
}


class ProductTitleSection extends StatelessWidget {
  const ProductTitleSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: const [
            Expanded(
              child: Text(
                'Premium Basmati Rice',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            Text(
              '₹3,450',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xFF2E7D32),
              ),
            ),
          ],
        ),
        const SizedBox(height: 4),
        const Text(
          'Available: 50 Quintals • per Quintal',
          style: TextStyle(color: Colors.grey),
        ),
        const SizedBox(height: 12),

        Row(
          children: const [
            CircleAvatar(
              radius: 18,
              backgroundColor: Color(0xFFDFF3E3),
              child: Icon(Icons.person, color: Color(0xFF2E7D32)),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Rajesh Kumar',
                      style: TextStyle(fontWeight: FontWeight.bold)),
                  Text('Farmer • 12 km away',
                      style: TextStyle(color: Colors.grey, fontSize: 12)),
                ],
              ),
            ),
            Icon(Icons.verified, color: Color(0xFF2E7D32)),
          ],
        ),
      ],
    );
  }
}


class AIQualityScoreSection extends StatelessWidget {
  const AIQualityScoreSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: const [
            Text('AI Quality Score',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            SizedBox(width: 8),
            Chip(label: Text('Grade A+')),
          ],
        ),
        const SizedBox(height: 12),

        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          children: const [
            QualityMetric('Moisture', '12.4%', 'Ideal'),
            QualityMetric('Grain Length', '7.2mm', 'Long'),
            QualityMetric('Purity', '99.2%', 'High'),
            QualityMetric('Broken Grain', '0.5%', 'Minimal'),
          ],
        ),
      ],
    );
  }
}

class QualityMetric extends StatelessWidget {
  final String label;
  final String value;
  final String tag;

  const QualityMetric(this.label, this.value, this.tag, {super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 6),
          Text(value,
              style:
                  const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(tag, style: const TextStyle(color: Colors.green)),
        ],
      ),
    );
  }
}


class MarketInsightCard extends StatelessWidget {
  const MarketInsightCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1F2937),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('Market Insight',
              style: TextStyle(color: Colors.white70, fontSize: 12)),
          SizedBox(height: 8),
          Text(
            'Farmer Price: ₹3,450\nMandi Average: ₹3,620',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 6),
          Text(
            '▼ 4.7% cheaper than local market',
            style: TextStyle(color: Colors.greenAccent),
          ),
        ],
      ),
    );
  }
}

class HarvestDetailsSection extends StatelessWidget {
  const HarvestDetailsSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text('Harvest Details',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
        SizedBox(height: 12),
        HarvestRow('Harvest Date', '12 Oct 2023'),
        HarvestRow('Storage Location', 'Dry Warehouse, Barn'),
        HarvestRow('Pesticide Free', 'Yes (Certified)'),
      ],
    );
  }
}

class HarvestRow extends StatelessWidget {
  final String label;
  final String value;

  const HarvestRow(this.label, this.value, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          Text(value, style: const TextStyle(fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}

class ProductBottomActions extends StatelessWidget {
  const ProductBottomActions({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 20),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(
          top: BorderSide(color: Colors.black12),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: OutlinedButton(
              onPressed: () {},
              child: const Text('Negotiate'),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: ElevatedButton(
              onPressed: () {},
              child: const Text('Buy Now'),
            ),
          ),
        ],
      ),
    );
  }
}
