<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomersController extends Controller
{
    private $screen;

    public function __construct()
    {
        $this->screen = [
            'isMobileSidebar' => false,
            'name' => 'projects'
        ];
    }

    public function index()
    {
        $customers = Customer::select('id', 'first_name', 'last_name', 'email', 'created_at')->get();

        return Inertia::render('Projects/Customers/IndexCustomer', [
            'screen' => array_merge($this->screen, ['isMobileSidebar' => true]),
            'customers' => $customers
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Customers/CreateCustomer', [
            'screen' => $this->screen
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:proj_customers,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100'
        ]);

        Customer::create($validatedData);

        return redirect()->route('customers.index')->with('success', 'Customer created successfully.');
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('Projects/Customers/ShowCustomer', [
            'screen' => $this->screen,
            'customer' => $customer
        ]);
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return Inertia::render('Projects/Customers/EditCustomer', [
            'screen' => $this->screen,
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:proj_customers,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100'
        ]);

        $customer = Customer::findOrFail($id);
        $customer->update($validatedData);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }
}
