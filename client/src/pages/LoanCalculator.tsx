import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Download, Calculator, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface ScheduleRow {
  pmtNo: number;
  paymentDate: string;
  beginningBalance: number;
  scheduledPayment: number;
  extraPayment: number;
  totalPayment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  cumulativeBalance: number;
  netCashflow: number;
}

interface CashflowItem {
  date: Date;
  amount: number;
  description?: string;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [startDate, setStartDate] = useState('');
  const [repaymentFreq, setRepaymentFreq] = useState('Monthly');
  const [moratorium, setMoratorium] = useState('0');
  const [processingFee, setProcessingFee] = useState('0');
  const [professionalFee, setProfessionalFee] = useState('0');
  const [otherCosts, setOtherCosts] = useState('0');
  const [repaymentType, setRepaymentType] = useState('EMI');
  const [commaSystem, setCommaSystem] = useState<'indian' | 'international'>('indian');
  
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatIndianNumber = (x: string | number): string => {
    let str = x.toString().replace(/,/g, '');
    if (str.indexOf('.') !== -1) {
      const parts = str.split('.');
      return formatIndianNumber(parts[0]) + '.' + parts[1];
    }
    let lastThree = str.substring(str.length - 3);
    let otherNumbers = str.substring(0, str.length - 3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  const formatInternationalNumber = (x: string | number): string => {
    let str = x.toString().replace(/,/g, '');
    if (str.indexOf('.') !== -1) {
      const parts = str.split('.');
      return formatInternationalNumber(parts[0]) + '.' + parts[1];
    }
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatNumber = (value: number, system: 'indian' | 'international'): string => {
    const fixed = value.toFixed(2);
    return system === 'indian' ? formatIndianNumber(fixed) : formatInternationalNumber(fixed);
  };

  const formatCurrency = (value: number, system: 'indian' | 'international'): string => {
    if (system === 'indian') {
      if (value >= 10000000) return '₹' + (value/10000000).toFixed(2) + ' Cr';
      if (value >= 100000) return '₹' + (value/100000).toFixed(2) + ' L';
      return '₹' + formatIndianNumber(value.toFixed(2));
    } else {
      if (value >= 1000000000) return '$' + (value/1000000000).toFixed(2) + ' B';
      if (value >= 1000000) return '$' + (value/1000000).toFixed(2) + ' M';
      if (value >= 1000) return '$' + (value/1000).toFixed(2) + ' K';
      return '$' + formatInternationalNumber(value.toFixed(2));
    }
  };

  const formatDate = (date: Date): string => {
    return ("0" + date.getDate()).slice(-2) + "-" + monthNames[date.getMonth()] + "-" + date.getFullYear();
  };

  const handleLoanAmountChange = (value: string) => {
    const cleaned = value.replace(/,/g, '');
    if (cleaned === '' || !isNaN(Number(cleaned))) {
      setLoanAmount(cleaned);
    }
  };

  const getFrequency = (freq: string): number => {
    switch (freq) {
      case "Monthly": return 12;
      case "Quarterly": return 4;
      case "Halfyearly": return 2;
      case "Annually": return 1;
      default: return 12;
    }
  };

  const parseTenure = (tenureStr: string) => {
    const parts = tenureStr.split(',');
    let years = parseInt(parts[0]) || 0;
    let months = parts.length > 1 ? parseInt(parts[1]) || 0 : 0;
    const totalYears = years + (months / 12);
    const totalMonths = (years * 12) + months;
    return { years: totalYears, months: totalMonths };
  };

  const calculateXIRR = (cashflows: CashflowItem[]): number => {
    if (!cashflows || cashflows.length < 2) return 0;

    const values: number[] = [];
    const dates: Date[] = [];
    
    cashflows.forEach(item => {
      values.push(item.amount);
      dates.push(new Date(item.date));
    });

    let hasPositive = false;
    let hasNegative = false;
    
    values.forEach(amount => {
      if (amount > 0) hasPositive = true;
      if (amount < 0) hasNegative = true;
    });

    if (!hasPositive || !hasNegative) return 0;

    const MIN_RATE = -0.9999999;
    const MAX_RATE = 100;
    const MAX_ITERATIONS = 100;
    const PRECISION = 1e-10;

    const calculateResult = (rate: number) => {
      let result = 0;
      const r = 1 + rate;
      const startDate = dates[0];
      
      for (let i = 0; i < values.length; i++) {
        const days = (dates[i].getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        result += values[i] / Math.pow(r, days / 365);
      }
      return result;
    };

    let rate = 0.1;
    let iteration = 0;
    let contLoop = true;
    let result;

    while (contLoop && iteration < MAX_ITERATIONS) {
      result = calculateResult(rate);
      
      const rateUp = rate * 1.0001;
      const resultUp = calculateResult(rateUp);
      const derivative = (resultUp - result) / (rateUp - rate);
      
      if (Math.abs(derivative) < PRECISION) {
        break;
      }

      const newRate = rate - result / derivative;
      
      if (Math.abs(newRate - rate) < PRECISION) {
        contLoop = false;
        rate = newRate;
      } else {
        rate = Math.max(MIN_RATE, Math.min(MAX_RATE, newRate));
      }
      
      iteration++;
    }

    if (isNaN(rate)) return 0;
    const annualizedRate = rate * 100;
    if (annualizedRate < -100 || annualizedRate > 100000) return 0;

    return annualizedRate;
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    const amount = loanAmount.replace(/,/g, '');

    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount';
    }

    if (!interestRate || isNaN(Number(interestRate)) || parseFloat(interestRate) <= 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
    }

    const tenureParts = tenure.split(',');
    if (!tenure || tenureParts.length > 2 || 
        (tenureParts.length === 1 && (isNaN(Number(tenureParts[0])) || parseInt(tenureParts[0]) <= 0)) ||
        (tenureParts.length === 2 && (isNaN(Number(tenureParts[0])) || parseInt(tenureParts[0]) < 0 || 
                                      isNaN(Number(tenureParts[1])) || parseInt(tenureParts[1]) < 0 || parseInt(tenureParts[1]) >= 12))) {
      newErrors.tenure = 'Please enter valid tenure (e.g., 5 or 5,3)';
    }

    if (!startDate) {
      newErrors.startDate = 'Please select a start date';
    }

    if (moratorium && parseInt(moratorium) < 0) {
      newErrors.moratorium = 'Moratorium cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateSchedule = () => {
    if (!validateInputs()) return;

    const amount = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100;
    const { months: totalMonths } = parseTenure(tenure);
    const start = new Date(startDate);
    const freq = repaymentFreq;
    const type = repaymentType;
    const morat = parseInt(moratorium) || 0;
    const procFee = (parseFloat(processingFee) || 0) / 100 * amount;
    const profFee = (parseFloat(professionalFee) || 0) / 100 * amount;
    const otherCost = parseFloat(otherCosts) || 0;
    const extraCosts = procFee + profFee + otherCost;

    const paymentsPerYear = getFrequency(freq);
    const totalPayments = Math.ceil(totalMonths / (12 / paymentsPerYear));
    const periodRate = rate / paymentsPerYear;

    let totalP = 0;
    let totalI = 0;
    const xirrData: CashflowItem[] = [
      { date: new Date(start), amount: amount, description: "Loan Disbursement" },
      { date: new Date(start), amount: -extraCosts, description: "Fees Deducted" }
    ];

    let emi = 0;
    if (type === "EMI") {
      emi = amount * periodRate / (1 - Math.pow(1 + periodRate, -totalPayments));
    } else if (type === "InterestOnly") {
      emi = amount * periodRate;
    } else if (type === "Balloon") {
      emi = (amount * 0.02);
    }

    const scheduleData: ScheduleRow[] = [];
    let balance = amount;
    let cumulative = 0;
    let paymentDate = new Date(start);

    scheduleData.push({
      pmtNo: 0,
      paymentDate: formatDate(paymentDate),
      beginningBalance: 0,
      scheduledPayment: 0,
      extraPayment: extraCosts,
      totalPayment: extraCosts,
      principal: 0,
      interest: 0,
      endingBalance: amount,
      cumulativeBalance: extraCosts,
      netCashflow: amount - extraCosts
    });

    const moratoriumPeriods = Math.ceil(morat / (12 / paymentsPerYear));
    const adjustedTotalPayments = totalPayments + moratoriumPeriods;
    let balloonPaymentRecalculated = false;

    for (let i = 1; i <= adjustedTotalPayments; i++) {
      if (freq === "Monthly") paymentDate.setMonth(paymentDate.getMonth() + 1);
      else if (freq === "Quarterly") paymentDate.setMonth(paymentDate.getMonth() + 3);
      else if (freq === "Halfyearly") paymentDate.setMonth(paymentDate.getMonth() + 6);
      else if (freq === "Annually") paymentDate.setFullYear(paymentDate.getFullYear() + 1);

      let interest = balance * periodRate;
      let principal = 0;
      let payment = emi;

      if (i <= moratoriumPeriods) {
        if (type === "InterestOnly") {
          payment = interest;
          principal = 0;
        } else {
          payment = 0;
          principal = 0;
          balance += interest;
        }
      } else {
        if (type === "Balloon" && moratoriumPeriods > 0 && !balloonPaymentRecalculated) {
          emi = balance * 0.02;
          payment = emi;
          balloonPaymentRecalculated = true;
        }
        
        if (type === "EMI") {
          principal = payment - interest;
          if (principal > balance) {
            principal = balance;
            payment = principal + interest;
          }
        } else if (type === "InterestOnly") {
          principal = (i === adjustedTotalPayments) ? balance : 0;
          payment = (i === adjustedTotalPayments) ? (balance + interest) : interest;
        } else if (type === "Balloon") {
          principal = (i === adjustedTotalPayments) ? balance : 0;
          payment = (i === adjustedTotalPayments) ? (balance + interest) : emi;
        }
      }

      let endingBalance = balance - principal;
      let totalPayment = payment;
      cumulative += totalPayment;

      totalP += principal;
      totalI += interest;

      if (totalPayment > 0 || i === adjustedTotalPayments) {
        xirrData.push({
          date: new Date(paymentDate),
          amount: -totalPayment
        });
      }

      scheduleData.push({
        pmtNo: i,
        paymentDate: formatDate(new Date(paymentDate)),
        beginningBalance: balance,
        scheduledPayment: payment,
        extraPayment: 0,
        totalPayment: totalPayment,
        principal: principal,
        interest: interest,
        endingBalance: endingBalance,
        cumulativeBalance: cumulative,
        netCashflow: -totalPayment
      });

      balance = endingBalance;
    }

    setSchedule(scheduleData);
    setTotalPrincipal(totalP);
    setTotalInterest(totalI);
    setTotalFees(extraCosts);
    setEffectiveRate(calculateXIRR(xirrData));
    setShowResults(true);
  };

  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const exportData = [
      ['Loan Amount', loanAmount],
      ['Interest Rate', interestRate],
      ['Tenure', tenure],
      ['Start Date', startDate],
      ['Repayment Frequency', repaymentFreq],
      ['Moratorium', moratorium],
      ['Processing Fee (%)', processingFee],
      ['Professional Fee (%)', professionalFee],
      ['Other Costs', otherCosts],
      ['Repayment Type', repaymentType],
      ['Total Principal', totalPrincipal],
      ['Total Interest', totalInterest],
      ['Total Fees', totalFees],
      ['Effective Interest Rate (XIRR)', effectiveRate.toFixed(2) + '%'],
      [],
      ['PMT No', 'Payment Date', 'Beginning Balance', 'Scheduled Payment', 'Extra Payment', 
       'Total Payment', 'Principal', 'Interest', 'Ending Balance', 'Cumulative Balance', 'Net Cashflow'],
      ...schedule.map(row => [
        row.pmtNo, 
        row.paymentDate, 
        row.beginningBalance,
        row.scheduledPayment,
        row.extraPayment,
        row.totalPayment,
        row.principal,
        row.interest,
        row.endingBalance,
        row.cumulativeBalance,
        row.netCashflow
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Amortization");
    XLSX.writeFile(wb, "Loan_Amortization_Schedule.xlsx");
  };

  const chartData = {
    labels: ['Principal', 'Interest', 'Fees'],
    datasets: [{
      data: [totalPrincipal, totalInterest, totalFees],
      backgroundColor: [
        'hsl(var(--primary))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-4))'
      ],
      borderWidth: 0
    }]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="relative z-10 px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-accent text-4xl md:text-5xl font-bold mb-4" data-testid="text-calculator-title">
              Loan Amortization Calculator
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-calculator-subtitle">
              Generate detailed EMI schedules with Excel export capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-1">
              <h2 className="font-accent text-2xl font-semibold mb-6">Loan Details</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    type="text"
                    value={loanAmount ? (commaSystem === 'indian' ? formatIndianNumber(loanAmount) : formatInternationalNumber(loanAmount)) : ''}
                    onChange={(e) => handleLoanAmountChange(e.target.value)}
                    data-testid="input-loan-amount"
                  />
                  {errors.loanAmount && <p className="text-sm text-destructive mt-1">{errors.loanAmount}</p>}
                </div>

                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    data-testid="input-interest-rate"
                  />
                  {errors.interestRate && <p className="text-sm text-destructive mt-1">{errors.interestRate}</p>}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="tenure">Tenure (Years, Months)</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter years and months separated by comma (e.g., "5,3" for 5 years and 3 months)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="tenure"
                    type="text"
                    placeholder="e.g., 5 or 5,3"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    data-testid="input-tenure"
                  />
                  {errors.tenure && <p className="text-sm text-destructive mt-1">{errors.tenure}</p>}
                </div>

                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    data-testid="input-start-date"
                  />
                  {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <Label htmlFor="repaymentFreq">Repayment Frequency</Label>
                  <Select value={repaymentFreq} onValueChange={setRepaymentFreq}>
                    <SelectTrigger data-testid="select-repayment-freq">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Halfyearly">Half-yearly</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="moratorium">Moratorium (Months)</Label>
                  <Input
                    id="moratorium"
                    type="number"
                    min="0"
                    value={moratorium}
                    onChange={(e) => setMoratorium(e.target.value)}
                    data-testid="input-moratorium"
                  />
                  {errors.moratorium && <p className="text-sm text-destructive mt-1">{errors.moratorium}</p>}
                </div>

                <div>
                  <Label htmlFor="processingFee">Processing Fee (%)</Label>
                  <Input
                    id="processingFee"
                    type="number"
                    step="0.01"
                    min="0"
                    value={processingFee}
                    onChange={(e) => setProcessingFee(e.target.value)}
                    data-testid="input-processing-fee"
                  />
                </div>

                <div>
                  <Label htmlFor="professionalFee">Professional Fee (%)</Label>
                  <Input
                    id="professionalFee"
                    type="number"
                    step="0.01"
                    min="0"
                    value={professionalFee}
                    onChange={(e) => setProfessionalFee(e.target.value)}
                    data-testid="input-professional-fee"
                  />
                </div>

                <div>
                  <Label htmlFor="otherCosts">Other Costs</Label>
                  <Input
                    id="otherCosts"
                    type="number"
                    min="0"
                    value={otherCosts}
                    onChange={(e) => setOtherCosts(e.target.value)}
                    data-testid="input-other-costs"
                  />
                </div>

                <div>
                  <Label htmlFor="repaymentType">Repayment Type</Label>
                  <Select value={repaymentType} onValueChange={setRepaymentType}>
                    <SelectTrigger data-testid="select-repayment-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMI">EMI</SelectItem>
                      <SelectItem value="InterestOnly">Interest Only</SelectItem>
                      <SelectItem value="Balloon">Balloon Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="commaSystem">Number Format</Label>
                  <Select value={commaSystem} onValueChange={(v) => setCommaSystem(v as 'indian' | 'international')}>
                    <SelectTrigger data-testid="select-comma-system">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indian">Indian</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={generateSchedule} className="flex-1" data-testid="button-generate">
                    <Calculator className="w-4 h-4 mr-2" />
                    Generate Schedule
                  </Button>
                  {showResults && (
                    <Button onClick={downloadExcel} variant="outline" data-testid="button-download">
                      <Download className="w-4 h-4 mr-2" />
                      Excel
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {showResults && (
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <h2 className="font-accent text-2xl font-semibold mb-6">Loan Summary</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary" data-testid="text-total-principal">
                        {formatCurrency(totalPrincipal, commaSystem)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Total Principal</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary" data-testid="text-total-interest">
                        {formatCurrency(totalInterest, commaSystem)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Total Interest</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary" data-testid="text-total-fees">
                        {formatCurrency(totalFees, commaSystem)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Total Fees</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary" data-testid="text-effective-rate">
                        {effectiveRate.toFixed(2)}%
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Effective Rate (XIRR)</p>
                    </div>
                  </div>

                  <div className="h-64">
                    <Pie 
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right'
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const label = context.label || '';
                                const value = context.raw as number || 0;
                                const formattedValue = formatCurrency(value, commaSystem);
                                const total = totalPrincipal + totalInterest + totalFees;
                                return `${label}: ${formattedValue} (${((value / total) * 100).toFixed(1)}%)`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="font-accent text-2xl font-semibold mb-6">Amortization Schedule</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid="table-schedule">
                      <thead className="bg-secondary sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left">PMT No</th>
                          <th className="px-4 py-3 text-left">Payment Date</th>
                          <th className="px-4 py-3 text-right">Beginning Balance</th>
                          <th className="px-4 py-3 text-right">Scheduled Payment</th>
                          <th className="px-4 py-3 text-right">Total Payment</th>
                          <th className="px-4 py-3 text-right">Principal</th>
                          <th className="px-4 py-3 text-right">Interest</th>
                          <th className="px-4 py-3 text-right">Ending Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((row, idx) => (
                          <tr key={idx} className="border-t hover-elevate">
                            <td className="px-4 py-3">{row.pmtNo}</td>
                            <td className="px-4 py-3">{row.paymentDate}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.beginningBalance, commaSystem)}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.scheduledPayment, commaSystem)}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.totalPayment, commaSystem)}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.principal, commaSystem)}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.interest, commaSystem)}</td>
                            <td className="px-4 py-3 text-right">{formatNumber(row.endingBalance, commaSystem)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
