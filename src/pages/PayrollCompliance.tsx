import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, CreditCard, Building, AlertTriangle, CheckCircle } from 'lucide-react';
import { dataService } from '@/services/dataService';

const PayrollCompliance = () => {
  const payrollData = dataService.getPayrollData();
  const complianceIssues = payrollData.filter(emp => !emp.upiId);
  const compliantEmployees = payrollData.filter(emp => emp.upiId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Payroll & Compliance Management</h1>
        <p className="text-muted-foreground">
          Manage employee banking details and ensure compliance requirements
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollData.length}</div>
            <p className="text-xs text-muted-foreground">In payroll system</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant Profiles</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{compliantEmployees.length}</div>
            <p className="text-xs text-muted-foreground">Complete information</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{complianceIssues.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((compliantEmployees.length / payrollData.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alerts */}
      {complianceIssues.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Compliance Issues Detected</AlertTitle>
          <AlertDescription className="text-red-700">
            {complianceIssues.length} employee(s) have missing UPI ID information. 
            Please update their profiles to ensure seamless payment processing.
          </AlertDescription>
        </Alert>
      )}

      {/* Payroll Data Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Employee Banking & Payroll Information</CardTitle>
          <CardDescription>Complete banking details for all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Bank Details</TableHead>
                  <TableHead>Account Info</TableHead>
                  <TableHead>UPI ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{employee.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Since {new Date(employee.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.contactNumber}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{employee.bankName}</div>
                        <div className="text-xs text-muted-foreground">{employee.branchName}</div>
                        <div className="text-xs text-muted-foreground">{employee.ifscCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{employee.accountHolder}</div>
                        <div className="text-xs text-muted-foreground">{employee.accountNumber}</div>
                        <div className="text-xs text-muted-foreground">{employee.accountType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {employee.upiId ? (
                        <span className="text-sm">{employee.upiId}</span>
                      ) : (
                        <span className="text-red-600 text-sm">Missing</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={employee.upiId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {employee.upiId ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Bank Address Information */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Bank Address Information</CardTitle>
          <CardDescription>Complete bank branch addresses for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Bank & Branch</TableHead>
                <TableHead>MICR Code</TableHead>
                <TableHead>Complete Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{employee.bankName}</div>
                      <div className="text-sm text-muted-foreground">{employee.branchName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.micrCode}</TableCell>
                  <TableCell>{employee.bankAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollCompliance;