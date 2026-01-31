import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class TimeSeriesAnalysisApp extends StatelessWidget {
  const TimeSeriesAnalysisApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 12, 16, 12),
      child: Column(
        children: [
          // ───────────── HEADER ─────────────
          const Align(
            alignment: Alignment.centerLeft,
            child: Text(
              'Tomato Price Trend',
              style: TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),

          const SizedBox(height: 8),

          // ───────────── CHART ─────────────
          Expanded(
            child: LineChart(
              _chartData(),
            ),
          ),
        ],
      ),
    );
  }

  LineChartData _chartData() {
    return LineChartData(
      minX: 0,
      maxX: 5,
      minY: 1.2,
      maxY: 4.6,

      gridData: FlGridData(show: false),
      borderData: FlBorderData(show: false),

      titlesData: FlTitlesData(
        topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
        rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),

        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 1.5,
            reservedSize: 34,
            getTitlesWidget: (value, meta) {
              return Text(
                '${value.toStringAsFixed(1)}k',
                style: const TextStyle(fontSize: 10, color: Colors.grey),
              );
            },
          ),
        ),

        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: 1,
            getTitlesWidget: (value, meta) {
              const labels = ['JAN', 'FEB', 'MAR', 'TODAY', 'MAY', 'JUN'];
              final index = value.toInt();
              if (index < 0 || index >= labels.length) {
                return const SizedBox.shrink();
              }

              final isToday = labels[index] == 'TODAY';

              return Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Text(
                  labels[index],
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight:
                        isToday ? FontWeight.bold : FontWeight.normal,
                    color: isToday
                        ? const Color(0xFF2E7D32)
                        : Colors.grey,
                  ),
                ),
              );
            },
          ),
        ),
      ),

      lineBarsData: [
        // ───────────── PAST (SOLID GREEN) ─────────────
        LineChartBarData(
          spots: const [
            FlSpot(0, 2.2),
            FlSpot(1, 1.9),
            FlSpot(2, 3.5),
            FlSpot(3, 2.7),
          ],
          isCurved: true,
          color: const Color(0xFF2E7D32),
          barWidth: 3,
          dotData: FlDotData(
            show: true,
            getDotPainter: (spot, percent, barData, index) {
              if (index == 3) {
                return FlDotCirclePainter(
                  radius: 4,
                  color: Colors.white,
                  strokeWidth: 2,
                  strokeColor: const Color(0xFF2E7D32),
                );
              }
              return FlDotCirclePainter(radius: 0);
            },
          ),
          belowBarData: BarAreaData(
            show: true,
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                const Color(0xFF2E7D32).withOpacity(0.25),
                Colors.transparent,
              ],
            ),
          ),
        ),

        // ───────────── FORECAST (DOTTED GREY) ─────────────
        LineChartBarData(
          spots: const [
            FlSpot(3, 2.7),
            FlSpot(4, 3.6),
            FlSpot(5, 3.4),
          ],
          isCurved: true,
          color: Colors.grey,
          barWidth: 2,
          dashArray: [6, 4],
          dotData: FlDotData(show: false),
          belowBarData: BarAreaData(
            show: true,
            color: Colors.grey.withOpacity(0.08),
          ),
        ),
      ],
    );
  }
}
