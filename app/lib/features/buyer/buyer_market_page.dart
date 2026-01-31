import 'package:app/features/buyer/product_details_page.dart';
import 'package:flutter/material.dart';

class BuyerMarketPage extends StatelessWidget {
  const BuyerMarketPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            MarketplaceHeader(),
            SizedBox(height: 16),
            SearchAndFilter(),
            SizedBox(height: 12),
            CategoryChips(),
            SizedBox(height: 16),
            MarketplaceResults(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class MarketplaceHeader extends StatelessWidget {
  const MarketplaceHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const CircleAvatar(
          radius: 18,
          backgroundColor: Color(0xFFDFF3E3),
          child: Icon(Icons.location_on, color: Color(0xFF2E7D32), size: 18),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'Buying in',
                style: TextStyle(fontSize: 12, color: Colors.grey),
              ),
              SizedBox(height: 2),
              Text(
                'Nashik, Maharashtra',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
        IconButton(
          onPressed: () {},
          icon: const Icon(Icons.notifications_none),
        ),
      ],
    );
  }
}

class SearchAndFilter extends StatelessWidget {
  const SearchAndFilter({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Search crops, farmers...',
              prefixIcon: const Icon(Icons.search),
              filled: true,
              fillColor: Colors.white,
              contentPadding: const EdgeInsets.symmetric(vertical: 0),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Container(
          height: 48,
          width: 48,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(14),
          ),
          child: const Icon(Icons.tune),
        ),
      ],
    );
  }
}

class CategoryChips extends StatelessWidget {
  const CategoryChips({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 36,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: const [
          CategoryChip('All Crops', selected: true),
          CategoryChip('Vegetables'),
          CategoryChip('Fruits'),
          CategoryChip('Grains'),
          CategoryChip('Organic'),
        ],
      ),
    );
  }
}

class CategoryChip extends StatelessWidget {
  final String label;
  final bool selected;

  const CategoryChip(this.label, {this.selected = false, super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: selected ? const Color(0xFF2E7D32) : Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: selected ? Colors.white : Colors.black,
          fontSize: 13,
        ),
      ),
    );
  }
}

class MarketplaceResults extends StatelessWidget {
  const MarketplaceResults({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        MarketplaceCard(
          title: 'Premium Basmati Rice',
          subtitle: 'Rajesh Kumar • 2.4 km away',
          price: '₹65 – 72',
          unit: 'per kg',
          quantity: '500 kg available',
          grade: 'A+ Export Quality',
          rating: '4.8',
          seasonal: false,
        ),
        MarketplaceCard(
          title: 'Organic Red Tomatoes',
          subtitle: 'Sunita Devi • 1.5 km away',
          price: '₹22 – 28',
          unit: 'per kg',
          quantity: '1,200 kg available',
          grade: 'Fresh Harvest',
          rating: '4.2',
          seasonal: false,
        ),
        MarketplaceCard(
          title: 'Ratnagiri Alphonso',
          subtitle: 'Gopal Rao • 12 km away',
          price: '₹450 – 600',
          unit: 'per dozen',
          quantity: 'Seasonal',
          grade: 'Premium',
          rating: '4.9',
          seasonal: true,
        ),
      ],
    );
  }
}

class MarketplaceCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String price;
  final String unit;
  final String quantity;
  final String grade;
  final String rating;
  final bool seasonal;

  const MarketplaceCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.price,
    required this.unit,
    required this.quantity,
    required this.grade,
    required this.rating,
    this.seasonal = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image placeholder
          Stack(
            children: [
              Container(
                height: 160,
                decoration: BoxDecoration(
                  color: const Color(0xFFEFEFEF),
                  borderRadius: const BorderRadius.vertical(
                    top: Radius.circular(20),
                  ),
                ),
                child: const Center(
                  child: Icon(Icons.image, size: 48, color: Colors.grey),
                ),
              ),
              Positioned(
                top: 12,
                right: 12,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.star, size: 14, color: Colors.orange),
                      const SizedBox(width: 4),
                      Text(rating),
                    ],
                  ),
                ),
              ),
              if (seasonal)
                Positioned(
                  top: 12,
                  left: 12,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.orange,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text(
                      'SEASONAL SPECIAL',
                      style: TextStyle(color: Colors.white, fontSize: 10),
                    ),
                  ),
                ),
            ],
          ),

          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  subtitle,
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
                const SizedBox(height: 10),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '$price',
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2E7D32),
                      ),
                    ),
                    Text(unit, style: const TextStyle(color: Colors.grey)),
                  ],
                ),

                const SizedBox(height: 8),
                Text(
                  'Quantity: $quantity',
                  style: const TextStyle(fontSize: 12),
                ),
                Text('Grade: $grade', style: const TextStyle(fontSize: 12)),

                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => const ProductDetailsPage(),
                        ),
                      );
                    },
                    child: const Text('View Details'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
