import 'package:flutter/material.dart';

class BuyerOrderDetailsPage extends StatelessWidget {
  const BuyerOrderDetailsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),
      appBar: AppBar(
        title: const Text('Order Details'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            OrderSummaryCard(),
            SizedBox(height: 20),
            OrderTimeline(),
            SizedBox(height: 20),
            SellerDetails(),
            SizedBox(height: 20),
            DeliveryDetails(),
            SizedBox(height: 80),
          ],
        ),
      ),
    );
  }
}

class OrderSummaryCard extends StatelessWidget {
  const OrderSummaryCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('#ORD-9021',
              style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 6),
          Text('Basmati Rice • 100 kg',
              style: TextStyle(color: Colors.grey)),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Total Amount'),
              Text(
                '₹8,900',
                style:
                    TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class OrderTimeline extends StatelessWidget {
  const OrderTimeline({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        Text('Order Status',
            style: TextStyle(fontWeight: FontWeight.bold)),
        SizedBox(height: 12),
        TimelineItem('Order Placed', true),
        TimelineItem('Packed by Farmer', true),
        TimelineItem('In Transit', true),
        TimelineItem('Delivered', false),
      ],
    );
  }
}

class TimelineItem extends StatelessWidget {
  final String label;
  final bool done;

  const TimelineItem(this.label, this.done, {super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Icon(
            done ? Icons.check_circle : Icons.radio_button_unchecked,
            color: done ? Colors.green : Colors.grey,
            size: 18,
          ),
          const SizedBox(width: 8),
          Text(label),
        ],
      ),
    );
  }
}

class SellerDetails extends StatelessWidget {
  const SellerDetails({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('Seller',
              style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text('Rajesh Kumar'),
          Text('Nashik, Maharashtra',
              style: TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }
}

class DeliveryDetails extends StatelessWidget {
  const DeliveryDetails({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text('Delivery Details',
              style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 8),
          Text('Expected Delivery: 26 Oct'),
          Text('Transport: Rhino Logistics',
              style: TextStyle(color: Colors.grey)),
        ],
      ),
    );
  }
}
