import 'package:flutter/material.dart';

class AddCropPage extends StatefulWidget {
  const AddCropPage({super.key});

  @override
  State<AddCropPage> createState() => _AddCropPageState();
}

class _AddCropPageState extends State<AddCropPage> {
  String selectedCrop = 'Wheat';
  final TextEditingController quantityController = TextEditingController();
  DateTime selectedDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF9FBF9),
      appBar: AppBar(
        title: const Text('Add New Listing'),
        leading: const BackButton(),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: Icon(Icons.help_outline),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _stepTitle(1, 'What did you harvest?'),
            const SizedBox(height: 12),

            Row(
              children: [
                Expanded(
                  child: CropOption(
                    title: 'Wheat',
                    subtitle: 'Kanki',
                    emoji: '🌾',
                    selected: selectedCrop == 'Wheat',
                    onTap: () {
                      setState(() => selectedCrop = 'Wheat');
                    },
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: CropOption(
                    title: 'Rice',
                    subtitle: 'Chawal',
                    emoji: '🌾',
                    selected: selectedCrop == 'Rice',
                    onTap: () {
                      setState(() => selectedCrop = 'Rice');
                    },
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),

            _stepTitle(2, 'How much do you have?'),
            const SizedBox(height: 12),

            QuantityInput(controller: quantityController),

            const SizedBox(height: 24),

            _stepTitle(3, 'Harvest Date'),
            const SizedBox(height: 12),

            DateSelector(
              date: selectedDate,
              onTap: () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: selectedDate,
                  firstDate: DateTime(2020),
                  lastDate: DateTime.now(),
                );
                if (picked != null) {
                  setState(() => selectedDate = picked);
                }
              },
            ),

            const SizedBox(height: 24),

            const AIPriceCard(),

            const SizedBox(height: 24),

            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                onPressed: () {},
                child: const Text('List My Crop'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}


Widget _stepTitle(int step, String title) {
  return Row(
    children: [
      CircleAvatar(
        radius: 12,
        backgroundColor: const Color(0xFF2E7D32),
        child: Text(
          step.toString(),
          style: const TextStyle(color: Colors.white, fontSize: 12),
        ),
      ),
      const SizedBox(width: 8),
      Text(
        title,
        style: const TextStyle(fontWeight: FontWeight.w600),
      ),
    ],
  );
}

class CropOption extends StatelessWidget {
  final String title;
  final String subtitle;
  final String emoji;
  final bool selected;
  final VoidCallback onTap;

  const CropOption({
    super.key,
    required this.title,
    required this.subtitle,
    required this.emoji,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: selected ? const Color(0xFF2E7D32) : Colors.grey.shade300,
            width: 2,
          ),
        ),
        child: Column(
          children: [
            Text(emoji, style: const TextStyle(fontSize: 36)),
            const SizedBox(height: 8),
            Text(
              title,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            Text(
              subtitle,
              style: const TextStyle(color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}

class QuantityInput extends StatelessWidget {
  final TextEditingController controller;

  const QuantityInput({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: controller,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                hintText: '00',
                border: InputBorder.none,
              ),
              style: const TextStyle(fontSize: 20),
            ),
          ),
          const Text(
            'Quintals',
            style: TextStyle(color: Colors.grey),
          ),
          const SizedBox(width: 12),
          const Icon(Icons.scale),
        ],
      ),
    );
  }
}

class DateSelector extends StatelessWidget {
  final DateTime date;
  final VoidCallback onTap;

  const DateSelector({
    super.key,
    required this.date,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            const Icon(Icons.calendar_today, size: 18),
            const SizedBox(width: 12),
            Text(
              'Today, ${date.day} ${_month(date.month)}',
            ),
            const Spacer(),
            const Icon(Icons.keyboard_arrow_down),
          ],
        ),
      ),
    );
  }

  String _month(int m) {
    const months = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];
    return months[m - 1];
  }
}


class AIPriceCard extends StatelessWidget {
  const AIPriceCard({super.key});

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
            '✨ AI PRICE RECOMMENDATION',
            style: TextStyle(color: Colors.white70, fontSize: 12),
          ),
          SizedBox(height: 8),
          Text(
            '₹2,100 – ₹2,350',
            style: TextStyle(
              color: Colors.white,
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 4),
          Text(
            'Based on market trends in Punjab\nand recent quality analysis',
            style: TextStyle(color: Colors.white70),
          ),
        ],
      ),
    );
  }
}
